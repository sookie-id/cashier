import { insertData } from "../persistence/insert-data";

export async function addVariantAttribute(params: {
  product_id: number;
  name: string;
}): Promise<void> {
  const attributeId = await insertData("variant_attributes", params);

  if (attributeId) {
    await insertData("variant_attribute_values", {
      product_id: params.product_id,
      variant_attribute_id: attributeId,
      name: "Default",
    });
  }
}
