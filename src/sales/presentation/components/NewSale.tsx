import { useState } from "react";
import { useTheme } from "styled-components";
import {
  DecrementButton,
  IncrementButton,
} from "../../../shared/components/Button.styled";
import { useMediaQuery } from "../../../utils/useMediaQuery";
import {
  DoubleColumnMenuContainer,
  H1,
  InputContainer,
  MenuTable,
  PageContainer,
  QuantitySpan,
  SingleColumnMenuContainer,
  StyledInput,
  SubmitButton,
} from "./NewSale.styled";

export default function NewSale({
  onGenerateReceipt,
  itemList,
  setPhone,
}: {
  onGenerateReceipt: (data: {
    purchasedItems: { name: string; quantity: number; subtotal: number }[];
    total: number;
    discount: number;
    discountAmount: number;
    totalAfterDiscount: number;
  }) => void;
  itemList: { name: string; price: number }[];
  setPhone: (phone: string) => void;
}) {
  const [quantities, setQuantities] = useState(Array(itemList.length).fill(0));
  const [discount, setDiscount] = useState(0);

  const theme = useTheme();

  const handleQuantityChange = (index: number, delta: number) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(0, qty + delta) : qty))
    );
  };

  const handleGenerateReceipt = () => {
    const purchasedItems = itemList
      .map((item, i) => ({
        ...item,
        quantity: quantities[i],
        subtotal: item.price * quantities[i],
      }))
      .filter((item) => item.quantity > 0);

    const total = purchasedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = total * (discount / 100);
    const totalAfterDiscount = total - discountAmount;

    onGenerateReceipt({
      purchasedItems,
      total,
      discount,
      discountAmount,
      totalAfterDiscount,
    });
  };

  // Split the itemList into two columns
  const mid = Math.ceil(itemList.length / 2);
  const leftItems = itemList.slice(0, mid);
  const rightItems = itemList.slice(mid);

  return (
    <PageContainer>
      <H1>New Sale</H1>
      {useMediaQuery(`(max-width: ${theme.spacing[1500]})`) ? (
        <SingleColumnMenuContainer>
          <MenuColumn
            items={itemList}
            startIndex={0}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
        </SingleColumnMenuContainer>
      ) : (
        <DoubleColumnMenuContainer>
          <MenuColumn
            items={leftItems}
            startIndex={0}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
          <MenuColumn
            items={rightItems}
            startIndex={mid}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
        </DoubleColumnMenuContainer>
      )}
      <InputContainer>
        <StyledInput
          label="Discount (%)"
          type="number"
          min="0"
          max="100"
          onChange={(value) => setDiscount(Number(value))}
        ></StyledInput>
        <StyledInput
          label="Phone Number"
          type="tel"
          onChange={setPhone}
        ></StyledInput>
      </InputContainer>
      <SubmitButton onClick={handleGenerateReceipt} type="submit">
        Generate Receipt
      </SubmitButton>
    </PageContainer>
  );
}

function MenuColumn({
  items,
  startIndex,
  quantities,
  handleQuantityChange,
}: {
  items: { name: string; price: number }[];
  startIndex: number;
  quantities: number[];
  handleQuantityChange: (index: number, delta: number) => void;
}) {
  return (
    <MenuTable>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={startIndex + index}>
            <td>{item.name}</td>
            <td>
              {item.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </td>
            <td>
              <DecrementButton
                onClick={() => handleQuantityChange(startIndex + index, -1)}
              >
                -
              </DecrementButton>
              <QuantitySpan>{quantities[startIndex + index]}</QuantitySpan>
              <IncrementButton
                onClick={() => handleQuantityChange(startIndex + index, 1)}
              >
                +
              </IncrementButton>
            </td>
          </tr>
        ))}
      </tbody>
    </MenuTable>
  );
}
