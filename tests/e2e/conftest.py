"""End-to-end fixtures: spawn the docs site once per session and tear it down."""

from __future__ import annotations

import socket
import subprocess
import sys
import time
from pathlib import Path

import pytest


REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PORT = 8765  # avoid colliding with the default dev port


def _wait_for_port(host: str, port: int, timeout: float = 20.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        with socket.socket() as s:
            s.settimeout(0.5)
            try:
                s.connect((host, port))
                return True
            except OSError:
                time.sleep(0.2)
    return False


@pytest.fixture(scope="session")
def site_url():
    """Boot the Hotframe site on a free port for the whole test session."""
    proc = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "uxsite.main:app",
            "--host",
            "127.0.0.1",
            "--port",
            str(PORT),
            "--log-level",
            "warning",
        ],
        cwd=str(REPO_ROOT),
    )
    try:
        if not _wait_for_port("127.0.0.1", PORT):
            proc.terminate()
            raise RuntimeError("docs site did not start in time")
        yield f"http://127.0.0.1:{PORT}"
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
