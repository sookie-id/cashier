import { insertProduct } from "../persistence/insert-product";

export async function addProduct(product: { name: string, price: number}) {
    return await insertProduct(product);
}