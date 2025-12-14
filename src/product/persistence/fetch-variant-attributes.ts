import type { QueryData } from "@supabase/supabase-js";
import { databaseClient } from "./database-client";

const variantAttributesQuery = databaseClient.from("variant_attributes").select(
  `
    id, name,
    variant_attribute_values (
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
