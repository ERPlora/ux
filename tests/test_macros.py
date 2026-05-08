"""Snapshot-style tests for every ux-jinja macro.

The goal is to lock down the markup contract: any change to class names,
attribute order or default behaviour must break at least one test.
"""

from __future__ import annotations

from .conftest import render


# ---------------------------------------------------------------------------
# button
# ---------------------------------------------------------------------------


def test_button_default(env):
    out = render(env, '{% from "ui/button.jinja" import button %}{{ button("Save") }}')
    assert 'class="ux-btn ux-btn--primary"' in out
    assert 'type="button"' in out
    assert ">Save</button>" in out


def test_button_secondary_with_size(env):
    out = render(
        env,
        '{% from "ui/button.jinja" import button %}'
        '{{ button("Go", variant="secondary", size="lg") }}',
    )
    assert "ux-btn--secondary" in out
    assert "ux-btn--lg" in out


def test_button_with_on_click(env):
    src = (
        '{% from "ui/button.jinja" import button %}'
        '{{ button("Save", on_click="@post(\'/save\')") }}'
    )
    out = render(env, src)
    assert "data-on:click=" in out
    assert "@post(" in out


def test_button_link(env):
    out = render(
        env,
        '{% from "ui/button.jinja" import button %}'
        '{{ button("Go", href="/home") }}',
    )
    assert out.startswith("<a")
    assert 'href="/home"' in out
    assert 'type="button"' not in out


# ---------------------------------------------------------------------------
# badge
# ---------------------------------------------------------------------------


def test_badge_default(env):
    out = render(env, '{% from "ui/badge.jinja" import badge %}{{ badge("New") }}')
    assert 'class="ux-badge"' in out
    assert ">New</span>" in out


def test_badge_variant_and_dot(env):
    out = render(
        env,
        '{% from "ui/badge.jinja" import badge %}'
        '{{ badge("Live", variant="ok", dot=True) }}',
    )
    assert "ux-badge--ok" in out
    assert '<span class="ux-badge__dot"></span>' in out


# ---------------------------------------------------------------------------
# card
# ---------------------------------------------------------------------------


def test_card_with_title_and_body(env):
    src = (
        '{% from "ui/card.jinja" import card %}'
        '{% call card(title="Hello") %}<p>Body</p>{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-card"' in out
    assert 'class="ux-card__title">Hello</h3>' in out
    assert "<p>Body</p>" in out


def test_card_footer(env):
    src = (
        '{% from "ui/card.jinja" import card, card_footer %}'
        '{% call card(title="X") %}'
        "body "
        '{% call card_footer() %}<i>foot</i>{% endcall %}'
        '{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-card__footer"' in out
    assert "<i>foot</i>" in out


def test_card_variants(env):
    src = (
        '{% from "ui/card.jinja" import card %}'
        '{% call card(elevated=True, glass=True) %}body{% endcall %}'
    )
    out = render(env, src)
    assert "ux-card--elevated" in out
    assert "ux-card--glass" in out


# ---------------------------------------------------------------------------
# input
# ---------------------------------------------------------------------------


def test_input_default(env):
    out = render(
        env,
        '{% from "ui/input.jinja" import input %}'
        '{{ input("email", placeholder="you@example.com") }}',
    )
    assert 'class="ux-input"' in out
    assert 'name="email"' in out
    assert 'placeholder="you@example.com"' in out
    assert 'type="text"' in out


def test_input_invalid_with_signal(env):
    out = render(
        env,
        '{% from "ui/input.jinja" import input %}'
        '{{ input("zip", invalid=True, value_signal="$zip") }}',
    )
    assert "ux-input--invalid" in out
    assert 'data-bind="$zip"' in out


# ---------------------------------------------------------------------------
# textarea
# ---------------------------------------------------------------------------


def test_textarea_default(env):
    out = render(
        env,
        '{% from "ui/textarea.jinja" import textarea %}'
        '{{ textarea("notes", value="hello", rows=6) }}',
    )
    assert 'class="ux-textarea"' in out
    assert 'name="notes"' in out
    assert 'rows="6"' in out
    assert ">hello</textarea>" in out


def test_textarea_invalid(env):
    out = render(
        env,
        '{% from "ui/textarea.jinja" import textarea %}'
        '{{ textarea("notes", invalid=True) }}',
    )
    assert "ux-textarea--invalid" in out


# ---------------------------------------------------------------------------
# select
# ---------------------------------------------------------------------------


def test_select_with_tuples(env):
    src = (
        '{% from "ui/select.jinja" import select %}'
        '{{ select("country", options=[("us", "USA"), ("es", "Spain")], value="es") }}'
    )
    out = render(env, src)
    assert 'class="ux-select"' in out
    assert 'value="us"' in out
    assert 'value="es" selected' in out
    assert ">USA</option>" in out


def test_select_with_strings(env):
    src = (
        '{% from "ui/select.jinja" import select %}'
        '{{ select("size", options=["S", "M", "L"]) }}'
    )
    out = render(env, src)
    assert 'value="S"' in out
    assert ">M</option>" in out
    assert ">L</option>" in out


# ---------------------------------------------------------------------------
# modal
# ---------------------------------------------------------------------------


def test_modal_basic(env):
    src = (
        '{% from "ui/modal.jinja" import modal %}'
        '{% call modal("$show", title="Hi") %}<p>x</p>{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-modal-root"' in out
    assert 'data-show="$show"' in out
    assert 'class="ux-backdrop"' in out
    assert ">Hi</h3>" in out
    assert "<p>x</p>" in out


def test_modal_size_and_footer(env):
    src = (
        '{% from "ui/modal.jinja" import modal, modal_footer %}'
        '{% call modal("$show", size="lg") %}body'
        '{% call modal_footer(between=True) %}<b>foot</b>{% endcall %}'
        '{% endcall %}'
    )
    out = render(env, src)
    assert "ux-modal--lg" in out
    assert "ux-modal__footer ux-modal__footer--between" in out
    assert "<b>foot</b>" in out


# ---------------------------------------------------------------------------
# datatable
# ---------------------------------------------------------------------------


def test_datatable_basic(env):
    src = (
        '{% from "ui/datatable.jinja" import datatable %}'
        '{{ datatable("dt1", '
        "columns=[{'key': 'name', 'label': 'Name'}, {'key': 'qty', 'label': 'Qty', 'align': 'right'}], "
        "rows=[{'name': 'Apple', 'qty': 12}], search=False) }}"
    )
    out = render(env, src)
    assert 'class="ux-table-wrap"' in out
    assert 'id="dt1"' in out
    assert ">Name</th>" in out
    assert "ux-td--right" in out
    assert ">Apple</td>" in out


def test_datatable_search_signal(env):
    src = (
        '{% from "ui/datatable.jinja" import datatable %}'
        '{{ datatable("users", columns=["Name"], rows=[], search=True) }}'
    )
    out = render(env, src)
    assert "users_q" in out
    assert 'data-bind="$users_q"' in out


# ---------------------------------------------------------------------------
# pages
# ---------------------------------------------------------------------------


def test_dashboard_page_renders(env):
    src = '{% include "pages/dashboard.jinja" %}'
    out = env.from_string(src).render()
    assert "<h1" in out and "Dashboard" in out
    assert "ux-card" in out
    assert "Recent activity" in out


def test_list_view_page_renders(env):
    src = '{% include "pages/list_view.jinja" %}'
    out = env.from_string(src).render(
        users=[
            {"name": "Ada", "email": "ada@x.com", "role": "admin", "status": "active"},
            {"name": "Bob", "email": "bob@x.com", "role": "ops", "status": "suspended"},
        ]
    )
    assert "Users" in out
    assert "Ada" in out
    assert "Bob" in out
    assert "ux-table" in out
    # status badges: active -> ok, suspended -> danger
    assert "ux-badge--ok" in out
    assert "ux-badge--danger" in out
