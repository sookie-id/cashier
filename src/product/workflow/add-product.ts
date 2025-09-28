import { insertData } from "../persistence/insert-data";

export async function addProduct(product: {
  name: string;
  price: number;
}): Promise<void> {
  const productId = await insertData("products", product);

  if (productId) {
    await insertData("variants", { product_id: productId });
  }
}
