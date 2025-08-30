import { updateProduct } from "../persistence/update-product";

export async function updateProductPrice(params: { id: number, price: number}) {
    await updateProduct(params);
}