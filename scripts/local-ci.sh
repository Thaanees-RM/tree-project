#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-both}"

case "$MODE" in
  monolith|microservices|both)
    ;;
  *)
    echo "[CI] Invalid mode: $MODE"
    echo "[CI] Usage: ./scripts/local-ci.sh [monolith|microservices|both]"
    exit 1
    ;;
esac

echo "[CI] Starting local CI checks (mode: $MODE)..."

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
    --user "$(id -u):$(id -g)" \
    -v "$ROOT_DIR/$dir:/app" \
    -w /app \
    node:20-alpine \
    sh -lc "npm $*"
}

if [[ "$MODE" == "monolith" || "$MODE" == "both" ]]; then
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

  echo "[CI] Building monolith Docker images"
  docker compose build backend client admin
fi

if [[ "$MODE" == "microservices" || "$MODE" == "both" ]]; then
  echo "[CI] Building microservices Docker images"
  docker compose -f docker-compose.microservices.yml build
fi

echo "[CI] Local CI completed successfully."
