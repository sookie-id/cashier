import { useRef, useState } from "react";
import { EditableP, P } from "./EditableText.styled";

function EditableText({
  formatDisplayValue,
  onSave,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  formatDisplayValue?: (value: string) => string;
  onSave: (value: string) => void;
  value: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  const inputRef: React.Ref<HTMLInputElement> = useRef(null); // To focus the input
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleTextClick: React.MouseEventHandler<HTMLParagraphElement> = () => {
    setIsEditing(true);
    // Focus the input field after it's rendered
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    setIsEditing(false);
    if (event.target.value != props.value) {
      onSave(event.target.value);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleChangeValue = (value: string): void => {
    setValue(value);
  };

  const { className, ...restProps } = props;

  return (
    <div className={className}>
      {isEditing ? (
        <EditableP
          label=""
          ref={inputRef}
          onChangeValue={handleChangeValue}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          {...restProps}
          value={value}
        />
      ) : (
        <P ref={textRef} onClick={handleTextClick}>
          {formatDisplayValue ? formatDisplayValue(value) : value}
        </P>
      )}
    </div>
  );
}

export default EditableText;
