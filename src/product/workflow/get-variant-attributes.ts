import { fetchVariantAttributes } from "../persistence/fetch-variant-attributes";

export type VariantAttributes = Awaited<ReturnType<typeof fetchVariantAttributes>>

export async function getVariantAttributes(productId: number) {
  return await fetchVariantAttributes(productId)
}
