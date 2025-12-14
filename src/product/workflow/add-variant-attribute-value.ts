import { fetchData } from "../persistence/fetch-data";
import {
  fetchVariantAttributes,
  type VariantAttributes,
} from "../persistence/fetch-variant-attributes";
import { insertData } from "../persistence/insert-data";

function cartesianProduct(arrays: any[]) {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((a: any) => curr.map((b: any) => [...a, b])),
    [[]]
  );
}

export async function addVariantAttributeValue({
  productId,
  attributeId,
  name,
}: {
  productId: number;
  attributeId: number;
  name: string;
}): Promise<void> {
  const attributes = await fetchVariantAttributes(productId);
  if (!attributes || attributes.length == 0) {
    throw new Error("No variant attributes for this product");
  }

  const targetAttribute = attributes.find((attr) => attr.id === attributeId);
  if (!targetAttribute?.values || targetAttribute.values.length == 0) {
    addFirstValueForNewAttribute({
      productId,
      attributeId,
      name,
    });
  } else {
    addValueForAttribute({
      productId,
      attributes,
      attributeId,
      name,
    });
  }
}

async function addFirstValueForNewAttribute({
  productId,
  attributeId,
  name,
}: {
  productId: number;
  attributeId: number;
  name: string;
}) {
  // Insert the new attribute value
  const [{ id: attributeValueId }] = await insertData(
    "variant_attribute_values",
    {
      product_id: productId,
      variant_attribute_id: attributeId,
      name,
    }
  );

  // Fetch all variants
  let variants = await fetchData("variants", {
    filter: { product_id: productId },
    columns: ["id"],
  });

  // Create a variant if there is no variant yet
  if (!variants) {
    variants = await insertData("variants", {
      product_id: productId,
    });
  }

  // Insert the new attribute value to every variant
  for (const variant of variants) {
    await insertData("variant_values", {
      product_id: productId,
      variant_id: variant.id,
      variant_attribute_id: attributeId,
      variant_attribute_value_id: attributeValueId,
    });
  }
}

async function addValueForAttribute({
  productId,
  attributes,
  attributeId,
  name,
}: {
  productId: number;
  attributeId: number;
  name: string;
  attributes: VariantAttributes;
}) {
  // Insert the new attribute value
  const [{ id: attributeValueId }] = await insertData(
    "variant_attribute_values",
    {
      product_id: productId,
      variant_attribute_id: attributeId,
      name,
    }
  );

  // Create attribute value matrix
  const attributeValueMatrix = attributes.map((attr) => {
    // Only return the new attribute value for the target attribute
    if (attr.id === attributeId) {
      return [attributeValueId];
    }
    return attr.values.map((v) => v.id);
  });

  // Create new permutations for attribute values
  const permutations = cartesianProduct(attributeValueMatrix);

  // For every new permutation, create new variant
  for (const permutation of permutations) {
    const [variant] = await insertData("variants", {
      product_id: productId,
    });

    for (let i = 0; i < permutation.length; i++) {
      await insertData("variant_values", {
        product_id: productId,
        variant_id: variant.id,
        variant_attribute_id: attributes[i]!.id,
        variant_attribute_value_id: permutation[i],
      });
    }
  }
}
