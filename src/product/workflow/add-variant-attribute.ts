import { insertData } from "../persistence/insert-data";

export async function addVariantAttribute(params: {
  product_id: number;
  name: string;
}): Promise<void> {
  await insertData("variant_attributes", params);
}
