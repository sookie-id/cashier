import { IconAdd } from "../../shared/components/Icon.styled";
import { VariationModalContainer } from "./VariationModal.styled";

export default function VariationModal({
  style,
  ref,
}: {
  style: React.CSSProperties;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <VariationModalContainer style={style} ref={ref}>
      VariationModal
    <a onClick={() => {}}>
        <IconAdd width={24} />
    </a>
    </VariationModalContainer>
  );
}
