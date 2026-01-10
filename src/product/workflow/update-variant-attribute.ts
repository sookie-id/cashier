import { updateByID } from "../persistence/update-by-id";

export async function updateVariantAttribute(params: {
  id: number;
  name?: string;
}) {
  await updateByID("variant_attributes", params);
}
