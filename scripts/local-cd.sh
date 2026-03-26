#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[CD] Deploying stack locally with Docker Compose..."
docker compose down
docker compose up -d --build

echo "[CD] Current service status:"
docker compose ps

echo "[CD] Local deployment completed successfully."
