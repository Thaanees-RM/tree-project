#!/usr/bin/env bash
set -euo pipefail

# Creates qa and production branches from thaanees if they do not exist.

git fetch --all

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "thaanees" ]]; then
  echo "Switch to 'thaanees' branch first. Current: $CURRENT_BRANCH"
  exit 1
fi

for b in qa production; do
  if git rev-parse --verify "$b" >/dev/null 2>&1; then
    echo "Branch '$b' already exists locally"
  else
    git branch "$b"
    echo "Created local branch '$b'"
  fi

done

for b in qa production; do
  if git ls-remote --exit-code --heads newrepo "$b" >/dev/null 2>&1; then
    echo "Branch '$b' already exists on remote"
  else
    git push newrepo "$b"
    echo "Pushed '$b' to newrepo"
  fi

done

echo "Environment branches ready: thaanees, qa, production"
