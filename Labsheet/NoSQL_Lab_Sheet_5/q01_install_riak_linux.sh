#!/usr/bin/env bash
# Q1 setup/check helper. Install Riak using the package/container approved
# for your Linux distribution/course environment before running this script.
set -euo pipefail
RIAK_URL="${RIAK_URL:-http://localhost:8098}"
echo "Checking Riak HTTP endpoint: ${RIAK_URL}"
if command -v curl >/dev/null 2>&1; then
  curl --fail --silent --show-error "${RIAK_URL}/" >/dev/null
  echo "Riak HTTP endpoint is reachable."
else
  echo "curl is required for the connectivity check. Install it with your package manager."
  exit 1
fi
echo "Next: python q01_riak_student_crud.py"
