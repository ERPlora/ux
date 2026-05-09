"""Employees previews — list, add, edit."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "list": "Employees list",
    "add": "Add employee",
    "edit": "Edit employee",
}


@router.get("/preview/employees", name="employees_index", include_in_schema=False)
async def employees_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "employees",
            "pages": PAGES,
            "active_route": "/preview/employees",
        },
    )


@router.get("/preview/employees/{name}", name="employees_detail", include_in_schema=False)
async def employees_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown employees preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"employees/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/employees/{name}",
        },
    )
