#!/usr/bin/env bash
# remove_self_marked.sh — Audit for self-marked or rubric self-score content
set -e

echo "==> Scanning for self-marked content..."
MATCHES=$(grep -rniE \
  "self.?audit|100 / 100|40 / 40|20 / 20|grading rubric|"\
"submission verification|mandatory spec conformity|"\
"invitation reminder|collaborator lighton|commit trail|"\
"marks total|out of 100" \
  src/ public/ downloads/ 2>/dev/null || true)

if [ -z "$MATCHES" ]; then
  echo "✔ Clean — no self-marked content remains."
else
  echo "Found matches:"
  echo "$MATCHES"
fi
