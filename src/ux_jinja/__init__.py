"""ux-jinja — Jinja2 macros for @erplora/ux."""
from pathlib import Path

__version__ = "0.1.0"

TEMPLATES_DIR = Path(__file__).parent / "templates"
STATIC_DIR = Path(__file__).parent / "static"

__all__ = ["TEMPLATES_DIR", "STATIC_DIR", "__version__"]
