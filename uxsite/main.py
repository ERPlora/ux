"""ux.erplora.com — public docs site for the @erplora/ux library.

Run from the repo root::

    python -m uxsite.main           # uses the embedded uvicorn launcher below
    uvicorn uxsite.main:app          # or any standard ASGI server

Hotframe auto-discovers FastAPI routers under ``./apps/<name>/routes.py`` at
the current working directory; the apps for this site live at the repo root
in ``apps/`` so that discovery picks them up directly.
"""

from __future__ import annotations

import os
from pathlib import Path

import ux_jinja

from uxsite.settings import REPO_ROOT, settings


# Hotframe resolves ``apps/`` and the global ``templates/`` directory from
# the current working directory. Set CWD to the repo root before importing
# anything from hotframe so its module-level ``Path.cwd()`` snapshots see
# the right directory.
os.chdir(REPO_ROOT)


# Patch Hotframe's template-dir collector to also include the ux-jinja
# package's templates directory. Done at import time, before ``create_app``
# is called, so the engine is built with the right search paths.
_UX_JINJA_DIR = Path(ux_jinja.TEMPLATES_DIR)

# Imports below are intentionally placed AFTER the patch above:
# Hotframe builds its template engine inside `create_app()`, snapshotting
# the result of `_collect_template_dirs()` at that moment. We must patch
# the function before the module that uses it is imported and the engine
# is constructed.
from hotframe.templating import engine as _engine  # noqa: E402

_orig_collect = _engine._collect_template_dirs


def _patched_collect(modules_dir):
    dirs = _orig_collect(modules_dir)
    if _UX_JINJA_DIR.exists():
        ux_path = str(_UX_JINJA_DIR)
        if ux_path not in dirs:
            dirs.append(ux_path)
    return dirs


_engine._collect_template_dirs = _patched_collect


from fastapi import Response  # noqa: E402
from hotframe import create_app  # noqa: E402

app = create_app(settings)


# Inline favicon: a 1x1 transparent PNG. Avoids a noisy 404 on every page
# load without shipping a static asset; can be overridden later.
_FAVICON_PNG = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\x0f"
    b"\x00\x01\x01\x01\x00\x18\xdd\x8d\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> Response:
    return Response(content=_FAVICON_PNG, media_type="image/png")


def main() -> None:
    """Run uvicorn in dev mode. Used when invoked as ``python -m uxsite.main``."""
    import uvicorn

    uvicorn.run(
        "uxsite.main:app",
        host="127.0.0.1",
        port=int(os.environ.get("PORT", "8000")),
        reload=settings.DEBUG,
    )


if __name__ == "__main__":
    main()
