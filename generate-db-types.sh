#!/usr/bin/env bash
set -a # automatically export all variables
source .env
set +a

product_data_type_file_path=src/product/persistence/database.types.ts

# Generate product data type
npx supabase gen types typescript --project-id "$VITE_PROJECT_ID" --schema product > "$product_data_type_file_path"

# Point DefaultSchema to product instead of public
sed -i '' 's/"public"/"product"/g' "$product_data_type_file_path"

# Add TableNames type
cat <<EOF >> "$product_data_type_file_path"

export type TableNames = keyof Database["product"]["Tables"];
EOF
