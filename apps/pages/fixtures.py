"""Mock data for the example pages shipped in ux_jinja/templates/pages/."""

from __future__ import annotations


USERS = [
    {"name": "Ada Lovelace", "email": "ada@example.com", "role": "admin", "status": "active"},
    {"name": "Alan Turing", "email": "alan@example.com", "role": "engineer", "status": "active"},
    {"name": "Grace Hopper", "email": "grace@example.com", "role": "engineer", "status": "invited"},
    {"name": "Linus Torvalds", "email": "linus@example.com", "role": "ops", "status": "suspended"},
    {"name": "Margaret Hamilton", "email": "margaret@example.com", "role": "engineer", "status": "pending"},
]


USER = USERS[0]  # Ada Lovelace, used by profile/settings demos

PROFILE_STATS = {
    "tasks_completed": 142,
    "projects": 12,
    "team_size": 7,
}

PROFILE_ACTIVITY = [
    {"text": "Reviewed PR #284 in design-system", "type": "Review", "variant": "info"},
    {"text": "Closed ticket SUPP-1004", "type": "Closed", "variant": "ok"},
    {"text": "Published v2.3.1 of @erplora/ux", "type": "Release", "variant": "brand"},
    {"text": "Replied to feedback thread #19", "type": "Reply", "variant": "info"},
    {"text": "Locked credentials rotation policy", "type": "Security", "variant": "warn"},
]


def context_for(name: str) -> dict:
    """Return the render context required by each example page template."""
    if name == "list_view":
        return {"users": USERS}
    if name == "login":
        return {}
    if name == "settings":
        return {"user": {"name": USER["name"], "email": USER["email"], "bio": "Founder & engineer."}}
    if name == "profile":
        return {
            "user": {"name": USER["name"], "email": USER["email"]},
            "stats": PROFILE_STATS,
            "activity": PROFILE_ACTIVITY,
        }
    return {}
