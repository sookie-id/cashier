import { updateByID } from "../persistence/update-by-id";

export async function updateProduct(params: {
  id: number;
  name?: string;
  price?: number;
}) {
  await updateByID("products", params);
}
