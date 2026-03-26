#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-both}"

case "$MODE" in
	monolith|microservices|both)
		;;
	*)
		echo "[CD] Invalid mode: $MODE"
		echo "[CD] Usage: ./scripts/local-cd.sh [monolith|microservices|both]"
		exit 1
		;;
esac

if [[ "$MODE" == "monolith" || "$MODE" == "both" ]]; then
	echo "[CD] Deploying monolith stack locally with Docker Compose..."
	docker compose down
	docker compose up -d --build
fi

if [[ "$MODE" == "microservices" || "$MODE" == "both" ]]; then
	echo "[CD] Deploying microservices stack locally with Docker Compose..."
	docker compose -f docker-compose.microservices.yml down --remove-orphans || true
	docker compose -f docker-compose.microservices.yml up -d --build
fi

echo "[CD] Current service status:"
if [[ "$MODE" == "monolith" || "$MODE" == "both" ]]; then
	docker compose ps
fi

if [[ "$MODE" == "microservices" || "$MODE" == "both" ]]; then
	docker compose -f docker-compose.microservices.yml ps
fi

echo "[CD] Local deployment completed successfully."
