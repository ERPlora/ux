"""Home — landing page for the public docs site."""

from __future__ import annotations

from fastapi import APIRouter, Request

from uxsite.context import nav_context


router = APIRouter()


@router.get("/", name="home", include_in_schema=False)
async def home(request: Request):
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "home/index.html",
        {**nav_context()},
    )
