import { insertData } from "../persistence/insert-data";

export async function addVariantAttributeValue(params: {
  product_id: number;
  variant_attribute_id: number;
  name: string;
}): Promise<void> {
  await insertData("variant_attribute_values", params);
}
