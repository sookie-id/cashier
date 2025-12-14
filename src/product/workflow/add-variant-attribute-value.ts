import { fetchData } from "../persistence/fetch-data";
import { insertData } from "../persistence/insert-data";

export async function addVariantAttributeValue(params: {
  product_id: number;
  variant_attribute_id: number;
  name: string;
}): Promise<void> {
  const variantAttributeValueId = await insertData(
    "variant_attribute_values",
    params
  );

  const variantAttributes = await fetchData("variant_attributes", {
    filter: { product_id: params.product_id },
    // include: { variant_attribute_values: ['id']}
  });

  const otherVariantAttributes = variantAttributes?.filter(
    (variantAttribute) => variantAttribute.id !== params.variant_attribute_id
  );

  // Add product variations for each other variant attribute
  otherVariantAttributes?.forEach(async (otherVariantAttribute) => {
    const variantAttributeValues = await fetchData("variant_attribute_values", {
      filter: { variant_attribute_id: otherVariantAttribute.id },
    });

    // Add product variations for each other variant attribute value
    variantAttributeValues?.forEach(async (otherVariantAttributeValue) => {
      const variantId = await insertData("variants", {
        product_id: params.product_id,
      });

      // Add the new variant attribute value to the variant
      await insertData("variant_values", {
        product_id: params.product_id,
        variant_attribute_id: params.variant_attribute_id,
        variant_attribute_value_id: variantAttributeValueId,
        variant_id: variantId,
      });

      // Add the other variant attribute value to the variant
      await insertData("variant_values", {
        product_id: params.product_id,
        variant_attribute_id: otherVariantAttribute.id,
        variant_attribute_value_id: otherVariantAttributeValue.id,
        variant_id: variantId,
      });
    });
  });
}
