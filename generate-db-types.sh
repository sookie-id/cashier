#!/usr/bin/env bash
set -a # automatically export all variables
source .env
set +a

npx supabase gen types typescript --project-id "$VITE_PROJECT_ID" --schema product > src/product/persistence/database.types.ts