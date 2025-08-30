import { getProducts as getProductsFromDB } from "../persistence/get-products"

export async function getProducts() {
    return await getProductsFromDB()
}
