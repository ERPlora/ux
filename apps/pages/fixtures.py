"""Mock data for the example pages shipped in ux_jinja/templates/pages/."""

from __future__ import annotations


USERS = [
    {"name": "Ada Lovelace", "email": "ada@example.com", "role": "admin", "status": "active"},
    {"name": "Alan Turing", "email": "alan@example.com", "role": "engineer", "status": "active"},
    {"name": "Grace Hopper", "email": "grace@example.com", "role": "engineer", "status": "invited"},
    {"name": "Linus Torvalds", "email": "linus@example.com", "role": "ops", "status": "suspended"},
    {"name": "Margaret Hamilton", "email": "margaret@example.com", "role": "engineer", "status": "pending"},
]


def context_for(name: str) -> dict:
    """Return the render context required by each example page template."""
    if name == "list_view":
        return {"users": USERS}
    return {}
