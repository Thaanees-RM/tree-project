#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"$ROOT_DIR/scripts/local-ci.sh"
"$ROOT_DIR/scripts/local-cd.sh"

echo "[CI/CD] Full local pipeline finished successfully."
