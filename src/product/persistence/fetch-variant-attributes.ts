import type { QueryData } from "@supabase/supabase-js";
import { databaseReadClient } from "./database-client";

const variantAttributesQuery = databaseReadClient
  .from("variant_attributes")
  .select(
    `
    id, name,
    values: variant_attribute_values (
      id, name
    )
  `
  );

type FetchVariantAttributesReturn = QueryData<
  typeof variantAttributesQuery
> | null;

export async function fetchVariantAttributes(
  productId: number
): Promise<FetchVariantAttributesReturn> {
  const { data } = await variantAttributesQuery
    .order("id", { ascending: true })
    .eq("product_id", productId);

  return data;
}
