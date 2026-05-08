#!/usr/bin/env bash
# Idempotent provisioning script for the uxsite Lightsail Instance.
# Run as root the first time after the instance boots:
#   curl -fsSL https://raw.githubusercontent.com/ERPlora/ux/main/uxsite/deploy/setup.sh | sudo bash
# Subsequent runs are safe: every step is guarded.

set -euo pipefail

REPO_URL="https://github.com/ERPlora/ux.git"
APP_DIR="/srv/uxsite"
DEPLOY_USER="deploy"
DOMAIN="${UX_DOMAIN:-ux.erplora.com}"
ADMIN_EMAIL="${UX_ADMIN_EMAIL:-ops@erplora.com}"

if [[ "$EUID" -ne 0 ]]; then
  echo "This script must run as root. Re-run with: sudo $0" >&2
  exit 1
fi

# 1. Base packages -----------------------------------------------------------
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y software-properties-common ca-certificates curl git \
                    nginx supervisor unattended-upgrades

# Python 3.14 from deadsnakes (Ubuntu 24.04 ships 3.12 by default)
if ! command -v python3.14 >/dev/null 2>&1; then
  add-apt-repository -y ppa:deadsnakes/ppa
  apt-get update
  apt-get install -y python3.14 python3.14-venv
fi

# certbot via snap (recommended path on Ubuntu 24.04)
if ! command -v certbot >/dev/null 2>&1; then
  snap install --classic certbot
  ln -sf /snap/bin/certbot /usr/bin/certbot
fi

# 2. Deploy user + checkout --------------------------------------------------
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd -m -s /bin/bash "$DEPLOY_USER"
fi

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_DIR"

if [[ ! -d "$APP_DIR/.git" ]]; then
  sudo -u "$DEPLOY_USER" git clone "$REPO_URL" "$APP_DIR"
fi

# Virtualenv + dependencies
sudo -u "$DEPLOY_USER" bash -c "cd $APP_DIR && python3.14 -m venv .venv"
sudo -u "$DEPLOY_USER" bash -c "cd $APP_DIR && .venv/bin/pip install --upgrade pip"
sudo -u "$DEPLOY_USER" bash -c "cd $APP_DIR && .venv/bin/pip install -e '.[dev]' gunicorn"

# 3. Log directory -----------------------------------------------------------
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" /var/log/uxsite

# 4. Supervisor program ------------------------------------------------------
install -m 0644 "$APP_DIR/uxsite/deploy/supervisord.conf" \
                 /etc/supervisor/conf.d/uxsite.conf
supervisorctl reread
supervisorctl update
supervisorctl restart uxsite || supervisorctl start uxsite

# 5. nginx site --------------------------------------------------------------
install -m 0644 "$APP_DIR/uxsite/deploy/nginx.conf" \
                 /etc/nginx/sites-available/uxsite
ln -sf /etc/nginx/sites-available/uxsite /etc/nginx/sites-enabled/uxsite
# Disable the default site if it's still around
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# 6. Let's Encrypt cert + auto-renewal --------------------------------------
if [[ ! -d "/etc/letsencrypt/live/$DOMAIN" ]]; then
  certbot --nginx \
    --non-interactive --agree-tos \
    -m "$ADMIN_EMAIL" \
    -d "$DOMAIN" \
    --redirect
fi

# 7. Sudoers rules:
#    - `ubuntu` (the default Lightsail user, used by the release workflow
#      to SSH in) can restart supervisor and re-exec as deploy.
#    - `deploy` (the unprivileged user that owns /srv/uxsite) can also
#      restart supervisor for manual ops.
install -m 0440 /dev/stdin /etc/sudoers.d/uxsite-deploy <<'SUDO'
ubuntu ALL=(root) NOPASSWD: /usr/bin/supervisorctl restart uxsite, /usr/bin/supervisorctl start uxsite, /usr/bin/supervisorctl status uxsite
ubuntu ALL=(deploy) NOPASSWD: ALL
deploy ALL=(root) NOPASSWD: /usr/bin/supervisorctl restart uxsite, /usr/bin/supervisorctl start uxsite, /usr/bin/supervisorctl status uxsite
SUDO

echo
echo "uxsite is up. Test with: curl -I https://$DOMAIN/"
