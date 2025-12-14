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

export async function fetchVariantAttributes(
  productId: number
) {
  const { data } = await variantAttributesQuery
    .order("id", { ascending: true })
    .eq("product_id", productId);

  return data;
}
