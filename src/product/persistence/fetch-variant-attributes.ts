import { databaseReadClient } from "./database-client";

export type VariantAttributes = NonNullable<Awaited<ReturnType<typeof fetchVariantAttributes>>>;

export async function fetchVariantAttributes(productId: number) {
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

  const { data } = await variantAttributesQuery
    .order("id", { ascending: true })
    .eq("product_id", productId);

  return data;
}
