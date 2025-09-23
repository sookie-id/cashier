import { IconAdd } from "../../shared/components/Icon.styled";
import {
  AddVariationValueChip,
  H2,
  VariationChip,
  VariationModalContainer,
  VariationModalLink,
} from "./VariationModal.styled";

const MOCK_VARIATIONS = [
  {
    id: "1",
    name: "Texture",
    values: [
      {
        id: "1",
        name: "Dry",
      },
      {
        id: "2",
        name: "Chewy",
      },
    ],
  },
  {
    id: "2",
    name: "Flavor",
    values: [
      {
        id: "3",
        name: "Original",
      },
      {
        id: "4",
        name: "Choco Mint",
      },
    ],
  },
];

export default function VariationModal({
  style,
  ref,
}: {
  style: React.CSSProperties;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <VariationModalContainer style={style} ref={ref}>
      {MOCK_VARIATIONS.map((variation) => (
        <div key={variation.id} style={{ marginBottom: "16px" }}>
          <H2>{variation.name}</H2>
          {variation.values.map((value) => (
            <VariationChip
              key={value.id}
              value={value.name}
              onSave={() => {}}
            />
          ))}
          <AddVariationValueChip>+ Add New</AddVariationValueChip>
        </div>
      ))}
      <VariationModalLink onClick={() => {}}>
        <IconAdd width={24} />
        Add Variation
      </VariationModalLink>
    </VariationModalContainer>
  );
}
