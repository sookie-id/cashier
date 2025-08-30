import { updateProduct } from "../persistence/update-product";

export async function updateProductName(params: { id: number, name: string}) {
    await updateProduct(params);
}