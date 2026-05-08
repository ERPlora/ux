"""Shared fixtures for ux-jinja unit tests."""

from __future__ import annotations

import pytest
import ux_jinja
from jinja2 import Environment, FileSystemLoader, select_autoescape


@pytest.fixture
def env() -> Environment:
    """A Jinja env loaded against the packaged ux-jinja templates directory."""
    return Environment(
        loader=FileSystemLoader(str(ux_jinja.TEMPLATES_DIR)),
        extensions=["jinja2.ext.do"],
        autoescape=select_autoescape(["html"]),
    )


def render(env: Environment, source: str, **ctx) -> str:
    """Render a Jinja source string against the fixture env and trim it."""
    return env.from_string(source).render(**ctx).strip()
