import type { TablesInsert } from "../persistence/database.types";
import { fetchVariantAttributes } from "../persistence/fetch-variant-attributes";
import { insertData } from "../persistence/insert-data";

export async function addVariantAttributeValue(params: {
  product_id: number;
  variant_attribute_id: number;
  name: string;
}): Promise<void> {
  const insertResult = await insertData("variant_attribute_values", params);
  if (!insertResult || insertResult.length === 0) {
    throw new Error("Insert variant attribute values returned no rows");
  }

  const variantAttributeValueId = insertResult[0].id;
  const variantAttributes = await fetchVariantAttributes(params.product_id);

  const otherVariantAttributes = variantAttributes?.filter(
    (variantAttribute) => variantAttribute.id !== params.variant_attribute_id
  );

  const newVariantValues: TablesInsert<"variant_values">[] = [];

  // Add product variations for each other variant attribute
  otherVariantAttributes?.forEach(async (otherVariantAttribute) => {
    // Add product variations for each other variant attribute value
    // TODO: This will only work with 2 variant attributes, what if there are > 2?
    otherVariantAttribute.values.forEach(async (otherVariantAttributeValue) => {
      const insertResult = await insertData("variants", {
        product_id: params.product_id,
      });

      if (!insertResult || insertResult.length === 0) {
        throw new Error("Insert variants returned no rows");
      }

      const variantId = insertResult[0].id;

      // Add the new variant attribute value to the variant
      newVariantValues.push({
        product_id: params.product_id,
        variant_attribute_id: params.variant_attribute_id,
        variant_attribute_value_id: variantAttributeValueId,
        variant_id: variantId,
      });

      // Add the other variant attribute value to the variant
      newVariantValues.push({
        product_id: params.product_id,
        variant_attribute_id: otherVariantAttribute.id,
        variant_attribute_value_id: otherVariantAttributeValue.id,
        variant_id: variantId,
      });
    });
  });

  await insertData("variant_values", newVariantValues);
}
