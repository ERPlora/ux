"""Test that every CSS class emitted by a macro exists in lib/css/.

This catches:
- macros that emit a non-existent class (typos)
- macros that drift after CSS rename

It does NOT catch CSS classes defined in CSS but unused in macros — that's
intentional (the CSS library has more components than ux-jinja wraps).
"""

from __future__ import annotations

import re
from pathlib import Path

import pytest

import ux_jinja


REPO_ROOT = Path(ux_jinja.__file__).resolve().parents[2]
CSS_DIR = REPO_ROOT / "lib" / "css"
MACROS_DIR = Path(ux_jinja.TEMPLATES_DIR) / "ui"


def _all_css_classes() -> set[str]:
    """Collect every selector that starts with .ux-* in lib/css/."""
    pattern = re.compile(r"\.((?:ux-|md-)[A-Za-z0-9_-]+)")
    classes: set[str] = set()
    for css_file in CSS_DIR.rglob("*.css"):
        text = css_file.read_text(encoding="utf-8", errors="ignore")
        # Strip comments to avoid false positives.
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
        classes.update(pattern.findall(text))
    return classes


def _classes_used_by_macro(macro_path: Path) -> set[str]:
    """Conservatively extract ux-* class tokens used inside the macro file."""
    text = macro_path.read_text(encoding="utf-8")
    # Strip Jinja comments.
    text = re.sub(r"\{#.*?#\}", "", text, flags=re.DOTALL)
    # Catch every ux-foo token, including ones inside class strings.
    return set(re.findall(r"(ux-[A-Za-z0-9_-]+)", text))


CSS_CLASSES = _all_css_classes()
MACROS = sorted(p for p in MACROS_DIR.glob("*.jinja") if not p.name.startswith("_"))


@pytest.mark.parametrize("macro", MACROS, ids=lambda p: p.stem)
def test_macro_classes_exist_in_css(macro):
    used = _classes_used_by_macro(macro)
    missing = used - CSS_CLASSES
    assert not missing, (
        f"Macro {macro.name} emits classes not present in lib/css/: "
        f"{sorted(missing)}"
    )
