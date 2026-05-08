.PHONY: dev test test-py test-e2e build-css install-py

install-py:
	pip install -e ".[dev]"

dev:
	cd /Users/ioan/Desktop/code/ux && python -m uxsite.main

test-py:
	cd /Users/ioan/Desktop/code/ux && pytest tests/ -v

test-e2e:
	cd /Users/ioan/Desktop/code/ux && pytest tests/e2e/ -v

build-css:
	npm run build:lightning

test: test-py test-e2e
