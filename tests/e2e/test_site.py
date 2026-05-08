"""Golden-path Playwright tests for the docs site."""

from __future__ import annotations

from playwright.sync_api import sync_playwright


import os

# Default to bundled chromium-headless-shell. Set UX_PW_CHANNEL=chrome to use
# the system Chrome (required only in VS Code serve-web environments per the
# project's Playwright feedback note).
_PW_CHANNEL = os.environ.get("UX_PW_CHANNEL")
LAUNCH_KWARGS = {"channel": _PW_CHANNEL} if _PW_CHANNEL else {}


def test_home(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(site_url)
            assert "ERPlora UX" in page.content()
            # Sidebar is rendered for every page, so we should also see it here.
            assert page.locator(".ux-sidebar").count() == 1
        finally:
            browser.close()


def test_components_index(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/c")
            # Eight macro pages must be reachable from the components index.
            assert page.locator("a[href^='/c/']").count() >= 8
        finally:
            browser.close()


def test_component_button(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/c/button")
            # Live preview must contain rendered ux-btn elements.
            assert page.locator(".ux-btn").count() > 0
            # Source/HTML blocks must be visible.
            assert page.locator("pre, code").count() > 0
        finally:
            browser.close()


def test_component_badge(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/c/badge")
            assert page.locator(".ux-badge").count() > 0
        finally:
            browser.close()


def test_pages_index(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/p")
            assert page.locator("a[href^='/p/']").count() >= 2
        finally:
            browser.close()


def test_page_dashboard(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/p/dashboard")
            assert page.locator(".ux-card").count() >= 3
            assert "Dashboard" in page.content()
        finally:
            browser.close()


def test_page_list_view(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            page.goto(f"{site_url}/p/list_view")
            assert page.locator(".ux-table").count() == 1
            assert page.locator(".ux-badge").count() > 0
        finally:
            browser.close()


def test_unknown_component_404(site_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH_KWARGS)
        try:
            page = browser.new_page()
            response = page.goto(f"{site_url}/c/does-not-exist")
            assert response is not None
            assert response.status == 404
        finally:
            browser.close()
