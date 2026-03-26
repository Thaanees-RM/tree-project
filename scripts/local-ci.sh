#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[CI] Starting local CI checks..."

run_npm_in_dir() {
  local dir="$1"
  shift

  if command -v npm >/dev/null 2>&1; then
    (cd "$dir" && npm "$@")
    return
  fi

  if ! command -v docker >/dev/null 2>&1; then
    echo "[CI] Error: npm is not installed and Docker is not available for fallback."
    exit 1
  fi

  echo "[CI] npm not found. Using Node Docker image for $dir"
  docker run --rm \
    -v "$ROOT_DIR/$dir:/app" \
    -w /app \
    node:20-alpine \
    sh -lc "npm $*"
}

for service in Client admin backend; do
  echo "[CI] Installing dependencies for $service"
  run_npm_in_dir "$service" ci
done

echo "[CI] Running lint for frontend apps"
run_npm_in_dir Client run lint
run_npm_in_dir admin run lint

echo "[CI] Building frontend apps"
run_npm_in_dir Client run build
run_npm_in_dir admin run build

echo "[CI] Running backend dependency audit (non-blocking)"
run_npm_in_dir backend audit --audit-level=high || true

echo "[CI] Building Docker images"
docker compose build backend client admin

echo "[CI] Local CI completed successfully."
