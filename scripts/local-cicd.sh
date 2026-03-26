#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-both}"

"$ROOT_DIR/scripts/local-ci.sh" "$MODE"
"$ROOT_DIR/scripts/local-cd.sh" "$MODE"

echo "[CI/CD] Full local pipeline finished successfully (mode: $MODE)."
