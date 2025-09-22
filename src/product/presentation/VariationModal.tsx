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
    </VariationModalContainer>
  );
}
