#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/azure-bootstrap.sh <subscription_id> <env>
# Example:
#   ./scripts/azure-bootstrap.sh 00000000-0000-0000-0000-000000000000 thaanees

SUBSCRIPTION_ID="${1:-}"
ENVIRONMENT="${2:-thaanees}"

if [[ -z "$SUBSCRIPTION_ID" ]]; then
  echo "Usage: $0 <subscription_id> <env>"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TF_DIR="$ROOT_DIR/infra/terraform"
TFVARS="$TF_DIR/envs/${ENVIRONMENT}.tfvars"

if [[ ! -f "$TFVARS" ]]; then
  echo "Missing tfvars file: $TFVARS"
  exit 1
fi

cd "$TF_DIR"

terraform init
terraform plan -var "subscription_id=$SUBSCRIPTION_ID" -var-file "$TFVARS"

echo "If plan looks good, run:"
echo "terraform apply -var subscription_id=$SUBSCRIPTION_ID -var-file $TFVARS"
