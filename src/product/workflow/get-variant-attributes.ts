import { fetchVariantAttributes } from "../persistence/fetch-variant-attributes";

export async function getVariantAttributes(productId: number) {
  return await fetchVariantAttributes(productId)
}
