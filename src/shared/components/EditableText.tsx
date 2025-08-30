import { useLayoutEffect, useRef, useState } from "react";
import { P, StyledInput } from "./EditableText.styled";

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
  const [width, setWidth] = useState<number | undefined>(undefined);

  const inputRef: React.Ref<HTMLInputElement> = useRef(null); // To focus the input
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth + 30);
    }
  }, [value]);

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

  const handleChange = (newValue: string): void => {
    setValue(newValue);
  };

  return (
    <div>
      {isEditing ? (
        <StyledInput
          label=""
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          {...props}
          value={value}
          style={{ width }}
        />
      ) : (
        <P ref={textRef} onClick={handleTextClick} style={{ width }}>
          {formatDisplayValue ? formatDisplayValue(value) : value}
        </P>
      )}
    </div>
  );
}

export default EditableText;
