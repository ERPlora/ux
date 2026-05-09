"""Live — Datastar SSE showcase.

Four cards demonstrating the canonical Datastar patterns wired against
Hotframe's :mod:`hotframe.reactivity` re-export of ``datastar-py``:

  * Counter via SSE      — ``patch_signals`` from a POST endpoint.
  * Server clock stream  — long-running async generator that ``patch_elements``
                           every second for ten seconds.
  * Search filter        — pure client-side bind, no server hop, but proves
                           ``data-show`` works.
  * Accordion sync       — three accordions synced through one shared signal.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone

from fastapi import APIRouter, Request
from hotframe.reactivity import (
    ReadSignals,
    SSEResponse,
    ServerSentEventGenerator,
    sse_response,
)

from uxsite.context import nav_context


router = APIRouter()


@router.get("/live", name="live", include_in_schema=False)
async def live(request: Request):
    """Datastar showcase landing page."""
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "live/index.html",
        {**nav_context(request), "active_route": "/live"},
    )


# ---------------------------------------------------------------------------
# Counter — patch_signals on POST
# ---------------------------------------------------------------------------


@router.post("/live/api/increment", include_in_schema=False)
@sse_response
async def increment(signals: ReadSignals):
    """Read the current count from the request body, return count + 1.

    Datastar serialises every signal in the page on each ``@post(...)``
    invocation, so we can read the previous count and answer with a
    ``patch_signals`` event that contains the new value.
    """
    current = 0
    if signals and isinstance(signals.get("count"), (int, float)):
        current = int(signals["count"])
    return ServerSentEventGenerator.patch_signals({"count": current + 1})


@router.post("/live/api/reset", include_in_schema=False)
@sse_response
async def reset_counter():
    """Reset the counter signal back to zero."""
    return ServerSentEventGenerator.patch_signals({"count": 0})


# ---------------------------------------------------------------------------
# Clock — patch_elements stream
# ---------------------------------------------------------------------------


async def _clock_stream():
    """Yield a fragment per second for ten seconds, then stop.

    Each tick replaces the contents of ``#live-clock`` so the user sees the
    server's wall clock without any client polling.
    """
    for _ in range(10):
        now = datetime.now(timezone.utc).strftime("%H:%M:%S")
        fragment = (
            f'<div id="live-clock" style="font-family:var(--ux-font-mono);'
            f'font-size:24px;color:var(--ux-brand);">{now} UTC</div>'
        )
        yield ServerSentEventGenerator.patch_elements(fragment)
        await asyncio.sleep(1)
    # Final tick: announce the stream finished.
    yield ServerSentEventGenerator.patch_elements(
        '<div id="live-clock" style="font-family:var(--ux-font-mono);'
        'font-size:14px;color:var(--ux-ink-3);">stream complete</div>'
    )


@router.get("/live/api/clock", include_in_schema=False)
async def clock(request: Request):
    """Stream ten ticks of the server clock as Datastar fragment patches."""
    return SSEResponse(_clock_stream())
