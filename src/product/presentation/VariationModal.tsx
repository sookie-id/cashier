import { useEffect, useState } from "react";
import { IconAdd } from "../../shared/components/Icon.styled";
import type { VariantAttributes } from "../persistence/fetch-variant-attributes";
import { addVariantAttribute } from "../workflow/add-variant-attribute";
import { getVariantAttributes } from "../workflow/get-variant-attributes";
import {
  AddVariationValueChip,
  H2,
  VariationChip,
  VariationModalContainer,
  VariationModalLink,
} from "./VariationModal.styled";
import { addVariantAttributeValue } from "../workflow/add-variant-attribute-value";

export default function VariationModal({
  style,
  ref,
  productId,
}: {
  style: React.CSSProperties;
  ref: React.Ref<HTMLDivElement>;
  productId: number;
}) {
  const [variantAttributes, setVariantAttributes] = useState<VariantAttributes | null>(null);

  useEffect(() => {
    fetchVariantAttributes();
  }, []);

  const fetchVariantAttributes = async () => {
    const variantAttributes = await getVariantAttributes(productId);
    setVariantAttributes(variantAttributes);
  };

  const addVariation = async () => {
    await addVariantAttribute({
      productId,
      name: "New Variation",
    });
    fetchVariantAttributes();
  };

  const addValue = async (attributeId: number) => {
    await addVariantAttributeValue({
      productId,
      attributeId,
      name: "New Value",
    });
    fetchVariantAttributes();
  };

  return (
    <VariationModalContainer style={style} ref={ref}>
      {variantAttributes === null && <div>Loading...</div>}
      {variantAttributes && variantAttributes.length === 0 && <div>No variations found</div>}
      {variantAttributes &&
        variantAttributes.map((attribute) => (
          <div key={attribute.id} style={{ marginBottom: "16px" }}>
            <H2>{attribute.name}</H2>
            {attribute.values.map((value) => (
              <VariationChip
                key={value.id}
                value={value.name}
                onSave={() => {}}
              />
            ))}
            <AddVariationValueChip
              onClick={() => {
                addValue(attribute.id);
              }}
            >
              + Add New
            </AddVariationValueChip>
          </div>
        ))}
      <VariationModalLink
        onClick={() => {
          addVariation();
        }}
      >
        <IconAdd width={24} />
        Add Variation
      </VariationModalLink>
    </VariationModalContainer>
  );
}
