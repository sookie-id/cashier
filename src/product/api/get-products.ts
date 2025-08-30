import { getProducts as getProductsWorkflow } from "../workflow/get-products";

export async function getProducts() {
    return await getProductsWorkflow()
}