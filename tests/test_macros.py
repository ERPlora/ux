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


# ---------------------------------------------------------------------------
# avatar
# ---------------------------------------------------------------------------


def test_avatar_initials(env):
    out = render(
        env,
        '{% from "ui/avatar.jinja" import avatar %}{{ avatar(name="Ada Lovelace") }}',
    )
    assert 'class="ux-avatar"' in out
    assert ">AL<" in out


def test_avatar_size_and_status(env):
    out = render(
        env,
        '{% from "ui/avatar.jinja" import avatar %}'
        '{{ avatar(name="X", size="lg", status="online") }}',
    )
    assert "ux-avatar--lg" in out
    assert "ux-status-dot--online" in out


def test_avatar_image(env):
    out = render(
        env,
        '{% from "ui/avatar.jinja" import avatar %}'
        '{{ avatar(name="Ada", src="/u/ada.png") }}',
    )
    assert '<img src="/u/ada.png"' in out
    assert 'alt="Ada"' in out


# ---------------------------------------------------------------------------
# chip
# ---------------------------------------------------------------------------


def test_chip_default(env):
    out = render(env, '{% from "ui/chip.jinja" import chip %}{{ chip("Tag") }}')
    assert 'class="ux-chip"' in out
    assert ">Tag" in out


def test_chip_removable_brand(env):
    out = render(
        env,
        '{% from "ui/chip.jinja" import chip %}'
        '{{ chip("Tag", variant="brand", removable=True, on_remove="$tag.remove()") }}',
    )
    assert "ux-chip--brand" in out
    assert 'class="ux-chip__remove"' in out
    assert 'data-on:click="$tag.remove()"' in out


# ---------------------------------------------------------------------------
# kpi
# ---------------------------------------------------------------------------


def test_kpi_default(env):
    out = render(
        env,
        '{% from "ui/kpi.jinja" import kpi %}'
        '{{ kpi(label="Revenue", value="2,847", unit="€") }}',
    )
    assert 'class="ux-kpi"' in out
    assert 'class="ux-kpi__label">Revenue' in out
    assert "ux-kpi__value-unit" in out


def test_kpi_trend_up(env):
    out = render(
        env,
        '{% from "ui/kpi.jinja" import kpi %}'
        '{{ kpi(label="X", value="100", delta="+12%", trend="up", variant="brand") }}',
    )
    assert "ux-kpi--brand" in out
    assert "ux-kpi__delta--up" in out
    assert "ux-kpi__delta-arrow" in out


# ---------------------------------------------------------------------------
# tooltip
# ---------------------------------------------------------------------------


def test_tooltip_default(env):
    out = render(
        env,
        '{% from "ui/tooltip.jinja" import tooltip %}{{ tooltip("Hello") }}',
    )
    assert 'class="ux-tooltip ux-tooltip--top"' in out
    assert 'role="tooltip"' in out
    assert ">Hello</div>" in out


def test_tooltip_trigger(env):
    out = render(
        env,
        '{% from "ui/tooltip.jinja" import tooltip_trigger %}'
        '{% call tooltip_trigger(tip="Help text") %}?{% endcall %}',
    )
    assert 'data-tip="Help text"' in out
    assert ">?</span>" in out


# ---------------------------------------------------------------------------
# breadcrumbs
# ---------------------------------------------------------------------------


def test_breadcrumbs_basic(env):
    src = (
        '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
        "{{ breadcrumbs(items=["
        "{'label': 'Home', 'href': '/'}, "
        "{'label': 'Settings', 'href': '/s'}, "
        "{'label': 'Profile'}"
        "]) }}"
    )
    out = render(env, src)
    assert 'class="ux-crumbs"' in out
    assert 'href="/"' in out
    assert 'aria-current="page"' in out
    assert "ux-crumbs__sep" in out


def test_breadcrumbs_chips_variant(env):
    src = (
        '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
        "{{ breadcrumbs(items=[{'label': 'A'}, {'label': 'B'}], variant='chips') }}"
    )
    out = render(env, src)
    assert "ux-crumbs ux-crumbs--chips" in out


# ---------------------------------------------------------------------------
# progress
# ---------------------------------------------------------------------------


def test_progress_default(env):
    out = render(
        env,
        '{% from "ui/progress.jinja" import progress %}{{ progress(value=42) }}',
    )
    assert 'class="ux-progress"' in out
    assert "ux-progress__bar" in out
    assert "width: 42%" in out
    assert 'aria-valuenow="42"' in out


def test_progress_indeterminate_with_block(env):
    out = render(
        env,
        '{% from "ui/progress.jinja" import progress %}'
        '{{ progress(label="Loading", value_text="...", indeterminate=True, variant="warn") }}',
    )
    assert "ux-progress-block" in out
    assert "ux-progress--indeterminate" in out
    assert "ux-progress--warn" in out
    assert "width:" not in out  # indeterminate has no width style


# ---------------------------------------------------------------------------
# accordion
# ---------------------------------------------------------------------------


def test_accordion_default(env):
    src = (
        '{% from "ui/accordion.jinja" import accordion %}'
        "{{ accordion('faq', items=["
        "{'title': 'First', 'body': 'one'}, "
        "{'title': 'Second', 'body': 'two', 'open': True}"
        "]) }}"
    )
    out = render(env, src)
    assert 'class="ux-accordion"' in out
    assert "ux-accordion__trigger" in out
    assert "$faq_0" in out
    assert "$faq_1" in out
    assert '"faq_1": true' in out


def test_accordion_single_mode(env):
    src = (
        '{% from "ui/accordion.jinja" import accordion %}'
        "{{ accordion('a', items=[{'title': 'A', 'body': '1'}, {'title': 'B', 'body': '2'}], single=True, variant='cards') }}"
    )
    out = render(env, src)
    assert "ux-accordion--cards" in out
    assert "$a_open" in out
    assert '"a_open": -1' in out


# ---------------------------------------------------------------------------
# list
# ---------------------------------------------------------------------------


def test_list_basic_items(env):
    src = (
        '{% from "ui/list.jinja" import list %}'
        "{{ list(items=["
        "{'title': 'Profile', 'desc': 'Edit', 'icon_tone': 'brand', 'href': '/me'}, "
        "{'title': 'Billing', 'desc': 'Plan'}"
        "]) }}"
    )
    out = render(env, src)
    assert 'class="ux-list"' in out
    assert 'class="ux-list__item"' in out
    assert "ux-list__icon--brand" in out
    assert 'href="/me"' in out


def test_list_item_active(env):
    src = (
        '{% from "ui/list.jinja" import list_item %}'
        '{{ list_item(title="Hi", active=True, on_click="$x = 1", chev=False) }}'
    )
    out = render(env, src)
    assert 'data-active="true"' in out
    assert 'aria-current="true"' in out
    assert 'data-on:click="$x = 1"' in out
    assert "ux-list__chev" not in out


# ---------------------------------------------------------------------------
# tabs
# ---------------------------------------------------------------------------


def test_tabs_default(env):
    src = (
        '{% from "ui/tabs.jinja" import tabs %}'
        "{{ tabs('main', items=["
        "{'label': 'Resumen', 'key': 'resumen'}, "
        "{'label': 'Auditoria', 'key': 'aud'}"
        "]) }}"
    )
    out = render(env, src)
    assert 'class="ux-tabs"' in out
    assert 'role="tablist"' in out
    assert '"main_tab": "resumen"' in out
    # Single-quoted HTML attributes wrap double-quoted Datastar string
    # literals — same pattern the public preview site uses.
    assert 'data-on:click=\'$main_tab = "resumen"\'' in out
    assert 'data-attr:aria-selected=\'$main_tab === "aud"\'' in out


def test_tabs_pill_with_panel(env):
    src = (
        '{% from "ui/tabs.jinja" import tabs, tab_panel %}'
        "{{ tabs('view', items=[{'label': 'Hoy', 'key': 'hoy'}], variant='pill') }}"
        '{% call tab_panel("view", "hoy") %}<p>x</p>{% endcall %}'
    )
    out = render(env, src)
    assert "ux-tabs ux-tabs--pill" in out
    assert 'role="tabpanel"' in out
    assert "data-show='$view_tab ===" in out


# ---------------------------------------------------------------------------
# drawer
# ---------------------------------------------------------------------------


def test_drawer_basic(env):
    src = (
        '{% from "ui/drawer.jinja" import drawer %}'
        '{% call drawer("$show", title="Edit") %}<p>body</p>{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-drawer-root"' in out
    assert 'data-show="$show"' in out
    assert "ux-backdrop" in out
    assert ">Edit</div>" in out
    assert "<p>body</p>" in out


def test_drawer_left_with_footer(env):
    src = (
        '{% from "ui/drawer.jinja" import drawer, drawer_footer %}'
        '{% call drawer("$d", side="left") %}body'
        '{% call drawer_footer() %}<i>foot</i>{% endcall %}'
        '{% endcall %}'
    )
    out = render(env, src)
    assert "ux-drawer--left" in out
    assert 'class="ux-drawer__footer"' in out
    assert "<i>foot</i>" in out


# ---------------------------------------------------------------------------
# toast
# ---------------------------------------------------------------------------


def test_toast_default(env):
    out = render(
        env,
        '{% from "ui/toast.jinja" import toast %}'
        '{{ toast(title="Saved", desc="All good") }}',
    )
    assert 'class="ux-toast"' in out
    assert "ux-toast__title" in out
    assert ">All good</div>" in out


def test_toast_dismissible_variant_in_region(env):
    src = (
        '{% from "ui/toast.jinja" import toast, toast_region %}'
        '{% call toast_region(pos="bottom-left") %}'
        '{{ toast(title="Err", variant="danger", dismissible=True, on_dismiss="$t = false") }}'
        '{% endcall %}'
    )
    out = render(env, src)
    assert 'data-pos="bottom-left"' in out
    assert "ux-toast--danger" in out
    assert "ux-toast__close" in out
    assert 'data-on:click="$t = false"' in out


# ---------------------------------------------------------------------------
# divider
# ---------------------------------------------------------------------------


def test_divider_default(env):
    out = render(env, '{% from "ui/divider.jinja" import divider %}{{ divider() }}')
    assert '<hr class="ux-divider"' in out


def test_divider_vertical_and_label(env):
    out_vert = render(
        env,
        '{% from "ui/divider.jinja" import divider %}'
        '{{ divider(orientation="vertical") }}',
    )
    assert "ux-divider--vert" in out_vert
    out_label = render(
        env,
        '{% from "ui/divider.jinja" import divider %}{{ divider(label="OR") }}',
    )
    assert "ux-divider-row" in out_label
    assert ">OR</span>" in out_label


# ---------------------------------------------------------------------------
# extra example pages
# ---------------------------------------------------------------------------


def test_login_page_renders(env):
    src = '{% include "pages/login.jinja" %}'
    out = env.from_string(src).render().strip()
    assert "ux-card" in out
    assert "ux-card--elevated" in out
    assert 'type="email"' in out
    assert 'type="password"' in out
    assert "Sign in" in out
    assert "ux-btn--primary" in out
    assert "ux-badge" in out
    # default datastar wiring is preserved
    assert "@post('/auth/login')" in out


def test_settings_page_renders(env):
    src = '{% include "pages/settings.jinja" %}'
    out = env.from_string(src).render(
        user={"name": "Ada", "email": "ada@x.com", "bio": "Hello"}
    ).strip()
    assert "Settings" in out
    assert "ux-list" in out  # sidebar
    assert "ux-card" in out
    assert "ux-textarea" in out
    assert 'name="bio"' in out
    assert 'name="current_password"' in out
    assert 'value="Ada"' in out
    assert 'value="ada@x.com"' in out


def test_settings_page_renders_with_empty_context(env):
    src = '{% include "pages/settings.jinja" %}'
    out = env.from_string(src).render().strip()
    assert "Settings" in out
    assert "ux-card" in out
    assert "ux-textarea" in out


def test_profile_page_renders(env):
    src = '{% include "pages/profile.jinja" %}'
    out = env.from_string(src).render().strip()
    assert "User profile" in out
    assert "ux-avatar" in out
    assert "ux-avatar--xl" in out
    assert "ux-kpi" in out
    assert "Tasks completed" in out
    assert "ux-card" in out
    assert "Recent activity" in out
    assert "Edit profile" in out


def test_profile_page_uses_user_context(env):
    src = '{% include "pages/profile.jinja" %}'
    out = env.from_string(src).render(
        user={"name": "Ada Lovelace", "email": "ada@x.com"},
        stats={"tasks_completed": 42, "projects": 7, "team_size": 5},
        activity=[{"label": "Did a thing", "kind": "ok"}],
    ).strip()
    assert "ada@x.com" in out
    # avatar initials from "Ada Lovelace"
    assert ">AL<" in out
    assert ">42<" in out
    assert "Did a thing" in out
    assert "ux-badge--ok" in out


# ---------------------------------------------------------------------------
# field
# ---------------------------------------------------------------------------


def test_field_with_label_and_hint(env):
    src = (
        '{% from "ui/field.jinja" import field %}'
        '{% call field(label="Email", hint="We never share it.") %}'
        '<input class="ux-input" name="email"/>'
        '{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-field"' in out
    assert 'class="ux-field__label"' in out
    assert 'class="ux-field__hint"' in out
    assert "We never share it." in out
    assert '<input class="ux-input" name="email"/>' in out


def test_field_required_with_error(env):
    src = (
        '{% from "ui/field.jinja" import field %}'
        '{% call field(label="Zip", hint="ignored", error="Required", required=True) %}'
        '<input class="ux-input"/>'
        '{% endcall %}'
    )
    out = render(env, src)
    assert "ux-field__label--req" in out
    assert "ux-field__error" in out
    assert "Required" in out
    # hint is suppressed when error is present
    assert "ux-field__hint" not in out


# ---------------------------------------------------------------------------
# toggle
# ---------------------------------------------------------------------------


def test_toggle_default(env):
    out = render(
        env,
        '{% from "ui/toggle.jinja" import toggle %}'
        '{{ toggle("notifs", value_signal="$notifs") }}',
    )
    assert 'class="ux-toggle"' in out
    assert 'data-bind="$notifs"' in out
    assert 'class="ux-toggle__track"' in out


def test_toggle_checked_lg(env):
    out = render(
        env,
        '{% from "ui/toggle.jinja" import toggle %}'
        '{{ toggle("dark", checked=True, size="lg") }}',
    )
    assert "ux-toggle--lg" in out
    assert "checked" in out


# ---------------------------------------------------------------------------
# check
# ---------------------------------------------------------------------------


def test_check_default(env):
    out = render(
        env,
        '{% from "ui/check.jinja" import check %}'
        '{{ check("agree", label="I agree") }}',
    )
    assert 'class="ux-check"' in out
    assert 'class="ux-check__box"' in out
    assert "I agree" in out


def test_check_with_value_signal(env):
    out = render(
        env,
        '{% from "ui/check.jinja" import check %}'
        '{{ check("opt", label="Subscribe", checked=True, value_signal="$opt") }}',
    )
    assert "checked" in out
    assert 'data-bind="$opt"' in out


# ---------------------------------------------------------------------------
# radio
# ---------------------------------------------------------------------------


def test_radio_default(env):
    out = render(
        env,
        '{% from "ui/radio.jinja" import radio %}'
        '{{ radio("plan", "monthly", label="Monthly") }}',
    )
    assert 'class="ux-radio"' in out
    assert 'class="ux-radio__dot"' in out
    assert 'name="plan"' in out
    assert 'value="monthly"' in out
    assert "Monthly" in out


def test_radio_group_inline(env):
    src = (
        '{% from "ui/radio.jinja" import radio_group %}'
        '{{ radio_group("freq", options=[("m", "Monthly"), ("y", "Yearly")], selected="y", inline=True) }}'
    )
    out = render(env, src)
    assert "ux-radio-group ux-radio-group--inline" in out
    assert 'role="radiogroup"' in out
    assert 'value="y" checked' in out
    assert ">Monthly" in out


# ---------------------------------------------------------------------------
# radio_card
# ---------------------------------------------------------------------------


def test_radio_card_default(env):
    src = (
        '{% from "ui/radio_card.jinja" import radio_card %}'
        '{{ radio_card("plan", options=['
        "{'value': 'crece', 'title': 'Crece', 'description': 'Hasta 3 terminales.'}, "
        "{'value': 'escala', 'title': 'Escala', 'description': 'Multi-tienda.'}"
        ']) }}'
    )
    out = render(env, src)
    assert 'class="ux-radio-card"' in out
    assert "ux-radio-card__title" in out
    assert "ux-radio-card__desc" in out
    assert "Crece" in out
    assert "Multi-tienda." in out


def test_radio_card_selected(env):
    src = (
        '{% from "ui/radio_card.jinja" import radio_card %}'
        '{{ radio_card("plan", options=[{"value": "a", "title": "A"}, {"value": "b", "title": "B"}], selected="b") }}'
    )
    out = render(env, src)
    assert 'value="b" checked' in out


# ---------------------------------------------------------------------------
# range
# ---------------------------------------------------------------------------


def test_range_default(env):
    out = render(
        env,
        '{% from "ui/range.jinja" import range %}'
        '{{ range("vol", min=0, max=10, value=5) }}',
    )
    assert 'class="ux-range"' in out
    assert 'type="range"' in out
    assert 'min="0"' in out
    assert 'max="10"' in out
    assert 'value="5"' in out


def test_range_with_signal(env):
    out = render(
        env,
        '{% from "ui/range.jinja" import range %}'
        '{{ range("commission", min=0, max=10, step=0.5, value_signal="$commission") }}',
    )
    assert 'step="0.5"' in out
    assert 'data-bind="$commission"' in out


# ---------------------------------------------------------------------------
# slider
# ---------------------------------------------------------------------------


def test_slider_default(env):
    out = render(
        env,
        '{% from "ui/slider.jinja" import slider %}'
        '{{ slider("margin", value=20) }}',
    )
    assert 'class="ux-slider"' in out
    assert 'type="range"' in out


def test_slider_variant_leaf(env):
    out = render(
        env,
        '{% from "ui/slider.jinja" import slider %}'
        '{{ slider("vol", variant="leaf", value=62, value_signal="$vol") }}',
    )
    assert "ux-slider--leaf" in out
    assert 'data-bind="$vol"' in out


# ---------------------------------------------------------------------------
# datepicker
# ---------------------------------------------------------------------------


def test_datepicker_default(env):
    out = render(
        env,
        '{% from "ui/datepicker.jinja" import datepicker %}'
        '{{ datepicker("dob") }}',
    )
    assert 'class="ux-datepicker"' in out
    assert 'type="date"' in out
    assert 'name="dob"' in out


def test_datepicker_with_min_max(env):
    out = render(
        env,
        '{% from "ui/datepicker.jinja" import datepicker %}'
        '{{ datepicker("from", value="2026-05-08", min="2026-01-01", max="2026-12-31", value_signal="$from") }}',
    )
    assert 'value="2026-05-08"' in out
    assert 'min="2026-01-01"' in out
    assert 'max="2026-12-31"' in out
    assert 'data-bind="$from"' in out


# ---------------------------------------------------------------------------
# timepicker
# ---------------------------------------------------------------------------


def test_timepicker_default(env):
    out = render(
        env,
        '{% from "ui/timepicker.jinja" import timepicker %}'
        '{{ timepicker("opens", value="09:30") }}',
    )
    assert 'class="ux-timepicker"' in out
    assert 'type="time"' in out
    assert 'value="09:30"' in out


def test_timepicker_disabled(env):
    out = render(
        env,
        '{% from "ui/timepicker.jinja" import timepicker %}'
        '{{ timepicker("locked", disabled=True) }}',
    )
    assert "disabled" in out
    assert 'name="locked"' in out


# ---------------------------------------------------------------------------
# dropzone
# ---------------------------------------------------------------------------


def test_dropzone_default(env):
    out = render(
        env,
        '{% from "ui/dropzone.jinja" import dropzone %}'
        '{{ dropzone("upload", accept=".csv,.xlsx") }}',
    )
    assert 'class="ux-dropzone"' in out
    assert 'name="upload"' in out
    assert 'accept=".csv,.xlsx"' in out
    assert 'class="ux-dropzone__icon"' in out
    assert 'class="ux-dropzone__title"' in out


def test_dropzone_drag_signal(env):
    out = render(
        env,
        '{% from "ui/dropzone.jinja" import dropzone %}'
        '{{ dropzone("files", drag_signal="$drag", hint="CSV up to 25 MB") }}',
    )
    assert "data-attr:data-state=" in out
    assert "$drag" in out
    assert "CSV up to 25 MB" in out


# ---------------------------------------------------------------------------
# combo
# ---------------------------------------------------------------------------


def test_combo_default(env):
    src = (
        '{% from "ui/combo.jinja" import combo %}'
        '{{ combo("client", options=['
        "{'value': 'a', 'label': 'Acme'}, "
        "{'value': 'b', 'label': 'Bravo'}"
        '], placeholder="Select client...") }}'
    )
    out = render(env, src)
    assert 'class="ux-combo"' in out
    assert 'class="ux-combo__field"' in out
    assert 'class="ux-combo__input"' in out
    assert 'placeholder="Select client..."' in out
    assert "Acme" in out


def test_combo_open_signal_and_selected(env):
    src = (
        '{% from "ui/combo.jinja" import combo %}'
        '{{ combo("c", options=[{"value": "x", "label": "X", "meta": "12 €"}], value="x", open_signal="$open") }}'
    )
    out = render(env, src)
    assert "ux-combo__option--selected" in out
    assert 'class="ux-combo__option-meta"' in out
    assert "$open" in out


# ---------------------------------------------------------------------------
# search
# ---------------------------------------------------------------------------


def test_search_default(env):
    out = render(
        env,
        '{% from "ui/search.jinja" import search %}'
        '{{ search("q", placeholder="Search...") }}',
    )
    assert 'class="ux-search"' in out
    assert 'class="ux-search__icon"' in out
    assert 'placeholder="Search..."' in out
    assert 'type="search"' in out


def test_search_with_kbd_and_signal(env):
    out = render(
        env,
        '{% from "ui/search.jinja" import search %}'
        '{{ search("q", value_signal="$q", on_input="@get(\'/search\')", kbd="⌘K") }}',
    )
    assert 'class="ux-search__kbd"' in out
    assert 'data-bind="$q"' in out
    assert "data-on:input=" in out


# ---------------------------------------------------------------------------
# timeline
# ---------------------------------------------------------------------------


def test_timeline_default(env):
    src = (
        '{% from "ui/timeline.jinja" import timeline %}'
        '{{ timeline(items=['
        "{'title': 'Created order', 'time': '14:02', 'desc': 'Mesa 4', 'variant': 'brand'}, "
        "{'title': 'Sent to kitchen', 'time': '14:03', 'variant': 'info'}"
        ']) }}'
    )
    out = render(env, src)
    assert 'class="ux-timeline"' in out
    assert "ux-timeline__item" in out
    assert "ux-timeline__dot--brand" in out
    assert "ux-timeline__dot--info" in out
    assert "Created order" in out
    assert "Mesa 4" in out


def test_timeline_dense(env):
    src = (
        '{% from "ui/timeline.jinja" import timeline %}'
        '{{ timeline(dense=True, items=[{"title": "Tick"}]) }}'
    )
    out = render(env, src)
    assert "ux-timeline ux-timeline--dense" in out


# ---------------------------------------------------------------------------
# empty
# ---------------------------------------------------------------------------


def test_empty_default(env):
    out = render(
        env,
        '{% from "ui/empty.jinja" import empty %}'
        '{{ empty(title="Sin movimientos", description="Importa un CSV para empezar.") }}',
    )
    assert 'class="ux-empty"' in out
    assert "ux-empty__icon" in out
    assert "ux-empty__title" in out
    assert "Sin movimientos" in out
    assert "Importa un CSV para empezar." in out


def test_empty_compact_with_action(env):
    out = render(
        env,
        '{% from "ui/empty.jinja" import empty %}'
        '{{ empty(title="Done", compact=True, action_label="Refresh", action_href="/r") }}',
    )
    assert "ux-empty--compact" in out
    assert 'class="ux-empty__actions"' in out
    assert 'href="/r"' in out
    assert ">Refresh</a>" in out


# ---------------------------------------------------------------------------
# states (loading_state, error_state, success_state)
# ---------------------------------------------------------------------------


def test_loading_state_default(env):
    out = render(
        env,
        '{% from "ui/states.jinja" import loading_state %}'
        '{{ loading_state(message="Loading data...") }}',
    )
    assert 'class="ux-loading' in out
    assert "ux-spinner" in out
    assert "Loading data..." in out
    assert 'role="status"' in out


def test_loading_state_size(env):
    out = render(
        env,
        '{% from "ui/states.jinja" import loading_state %}'
        '{{ loading_state(size="lg") }}',
    )
    assert "ux-spinner--lg" in out


def test_error_state_with_retry(env):
    out = render(
        env,
        '{% from "ui/states.jinja" import error_state %}'
        '{{ error_state(message="Backend down", code="502", retry_url="/dash", retry_label="Try again") }}',
    )
    assert 'class="ux-error"' in out
    assert "ux-error__title" in out
    assert "ux-error__code" in out
    assert "502" in out
    assert 'href="/dash"' in out
    assert "Try again" in out


def test_success_state_with_title(env):
    out = render(
        env,
        '{% from "ui/states.jinja" import success_state %}'
        '{{ success_state(title="Saved", message="Changes applied.") }}',
    )
    assert "ux-alert ux-alert--leaf" in out
    assert "ux-alert__title" in out
    assert "Saved" in out
    assert "Changes applied." in out


# ---------------------------------------------------------------------------
# calendar (ux-cal-mini)
# ---------------------------------------------------------------------------


def test_calendar_default(env):
    out = render(
        env,
        '{% from "ui/calendar.jinja" import calendar %}'
        '{{ calendar(year=2026, month=5) }}',
    )
    assert 'class="ux-cal-mini"' in out
    assert 'class="ux-cal-mini__title">May 2026' in out
    assert "ux-cal-mini__wd" in out
    # May 1 2026 is Friday -> 4 leading "out" cells
    assert out.count("ux-cal-mini__day--out") == 4
    # 31 day buttons
    assert out.count('data-date="2026-05-') == 31


def test_calendar_selected_and_event(env):
    out = render(
        env,
        '{% from "ui/calendar.jinja" import calendar %}'
        "{{ calendar(year=2026, month=5, selected='2026-05-12', events=['2026-05-08']) }}",
    )
    assert "ux-cal-mini__day--selected" in out
    assert "ux-cal-mini__day--has-event" in out
    assert 'data-date="2026-05-12"' in out


# ---------------------------------------------------------------------------
# icon
# ---------------------------------------------------------------------------


def test_icon_default(env):
    out = render(
        env,
        '{% from "ui/icon.jinja" import icon %}'
        '{{ icon("ion:home-outline") }}',
    )
    assert "<iconify-icon" in out
    assert 'icon="ion:home-outline"' in out
    assert 'width="20"' in out
    assert 'height="20"' in out


def test_icon_size_and_attrs(env):
    out = render(
        env,
        '{% from "ui/icon.jinja" import icon %}'
        '{{ icon("ph:gear-bold", size=32, attrs={"aria-label": "Settings"}) }}',
    )
    assert 'width="32"' in out
    assert 'aria-label="Settings"' in out


# ---------------------------------------------------------------------------
# spacer
# ---------------------------------------------------------------------------


def test_spacer_default(env):
    out = render(
        env,
        '{% from "ui/spacer.jinja" import spacer %}{{ spacer() }}',
    )
    assert 'class="ux-spacer ux-spacer--md"' in out
    assert 'aria-hidden="true"' in out


def test_spacer_block_lg(env):
    out = render(
        env,
        '{% from "ui/spacer.jinja" import spacer %}{{ spacer(size="lg", block=True) }}',
    )
    assert "ux-spacer--lg" in out
    assert "ux-spacer--block" in out


# ---------------------------------------------------------------------------
# topbar
# ---------------------------------------------------------------------------


def test_topbar_minimal(env):
    out = render(
        env,
        '{% from "ui/topbar.jinja" import topbar %}{{ topbar(title="Dashboard") }}',
    )
    assert 'class="ux-topbar"' in out
    assert 'class="ux-topbar__page-title">Dashboard</h1>' in out
    # Default show_menu=True renders the burger button.
    assert "ux-topbar__menu-btn" in out


def test_topbar_with_back(env):
    out = render(
        env,
        '{% from "ui/topbar.jinja" import topbar %}'
        '{{ topbar(title="Edit", back_href="/employees") }}',
    )
    assert "ux-topbar__back-btn" in out
    assert 'aria-label="Back"' in out
    assert "@get('/employees', {history: 'push'})" in out


def test_topbar_actions_slot(env):
    src = (
        '{% from "ui/topbar.jinja" import topbar %}'
        '{% call topbar(title="X") %}'
        '<button class="ux-icon-btn">A</button>'
        '{% endcall %}'
    )
    out = render(env, src)
    assert 'class="ux-topbar__actions"' in out
    assert ">A</button>" in out


def test_topbar_no_menu(env):
    out = render(
        env,
        '{% from "ui/topbar.jinja" import topbar %}'
        '{{ topbar(title="Plain", show_menu=False) }}',
    )
    assert "ux-topbar__menu-btn" not in out


def test_topbar_back_signal_overrides_href(env):
    out = render(
        env,
        '{% from "ui/topbar.jinja" import topbar %}'
        '{{ topbar(title="X", back_href="/x", back_signal="history.back()") }}',
    )
    assert "history.back()" in out
    # When a signal is set the @get(href) action is replaced.
    assert "@get(" not in out


# ---------------------------------------------------------------------------
# tabbar
# ---------------------------------------------------------------------------


def test_tabbar_renders_items(env):
    out = render(
        env,
        '{% from "ui/tabbar.jinja" import tabbar %}'
        '{{ tabbar(items=['
        '  {"label":"Home","href":"/","icon":"ion:home-outline"},'
        '  {"label":"Settings","href":"/settings","icon":"ion:settings-outline"}'
        ']) }}',
    )
    assert 'class="ux-tabbar"' in out
    assert 'href="/"' in out
    assert 'icon="ion:home-outline"' in out
    assert "Settings" in out


def test_tabbar_current(env):
    out = render(
        env,
        '{% from "ui/tabbar.jinja" import tabbar %}'
        '{{ tabbar(items=[{"label":"H","href":"/","icon":"ion:home-outline"}], current_path="/") }}',
    )
    assert 'aria-current="page"' in out


def test_tabbar_variant_and_fixed(env):
    out = render(
        env,
        '{% from "ui/tabbar.jinja" import tabbar %}'
        '{{ tabbar(items=[{"label":"H","href":"/","icon":"ion:home-outline"}], variant="pill", fixed=True) }}',
    )
    assert "ux-tabbar--pill" in out
    assert "ux-tabbar--fixed" in out


def test_tabbar_badge(env):
    out = render(
        env,
        '{% from "ui/tabbar.jinja" import tabbar %}'
        '{{ tabbar(items=[{"label":"Inbox","href":"/inbox","icon":"ion:mail","badge":"3"}]) }}',
    )
    assert 'class="ux-tabbar-badge">3</span>' in out
