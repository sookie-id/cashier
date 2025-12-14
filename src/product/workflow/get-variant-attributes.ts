import { fetchData } from "../persistence/fetch-data";

export async function getVariantAttributes(productId: number): Promise<
  {
    id: number;
    name: string;
    // values: {
    //   id: number;
    //   name: string;
    // }[];
  }[] | null
> {
  const variantAttributes = await fetchData("variant_attributes", {
    filter: { product_id: productId },
    columns: ["id", "name"],
  });

  return variantAttributes
  variantAttributes?.forEach((variantAttribute) => {});
}
