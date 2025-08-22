import { useState } from "react";
import { useTheme } from "styled-components";
import {
  DecrementButton,
  IncrementButton,
} from "../../../shared/components/Button.styled";
import { useMediaQuery } from "../../../utils/useMediaQuery";
import {
  DoubleColumnMenuContainer,
  InputContainer,
  MenuTable,
  PageContainer,
  QuantityControlContainer,
  QuantitySpan,
  SingleColumnMenuContainer,
  SubmitButton,
} from "./NewSale.styled";
import Input from "../../../shared/components/Input";

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

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
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
      {useMediaQuery(`(max-width: ${theme.spacing[1600]})`) ? (
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
      <form onSubmit={handleGenerateReceipt}>
        <InputContainer>
          <Input
            label="Discount (%)"
            type="number"
            min="0"
            max="100"
            onChange={(value) => setDiscount(Number(value))}
          ></Input>
          <Input label="Phone Number" type="tel" onChange={setPhone}></Input>
        </InputContainer>
        <SubmitButton type="submit">Generate Receipt</SubmitButton>
      </form>
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
              <QuantityControlContainer>
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
              </QuantityControlContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </MenuTable>
  );
}
