import { insertData } from "../persistence/insert-data";

export async function addVariantAttribute({
  productId,
  name,
}: {
  productId: number;
  name: string;
}): Promise<void> {
  await insertData("variant_attributes", {
    product_id: productId,
    name,
  });
}
