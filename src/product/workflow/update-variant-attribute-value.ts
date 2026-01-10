import { updateByID } from "../persistence/update-by-id";

export async function updateVariantAttributeValue(params: {
  id: number;
  name?: string;
}) {
  await updateByID("variant_attribute_values", params);
}
