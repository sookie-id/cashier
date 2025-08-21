import { useState } from "react";
import { useTheme } from "styled-components";
import { DecrementButton, IncrementButton, PrimaryButton } from "../../../shared/components/Button.styled";
import { useMediaQuery } from "../../../utils/useMediaQuery";

export default function Transaction({
  onGenerateReceipt,
  itemList,
  phone,
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
  phone: string;
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
    <div
      className="menu"
      style={{ maxWidth: "var(--size-1700)", margin: "0 auto" }}
    >
      <h1>Menu</h1>
      {useMediaQuery(`(max-width: ${theme.spacing[1500]})`) ? (
        <div
          style={{
            display: "flex",
            gap: "var(--size-500)",
            justifyContent: "center",
          }}
        >
          <MenuColumn
            items={itemList}
            startIndex={0}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
        </div>
      ) : (
        <div style={{ display: "flex", gap: "var(--size-500)" }}>
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
        </div>
      )}
      <div
        style={{
          marginTop: "var(--size-500)",
          display: "flex",
          gap: "var(--size-600)",
          flexDirection: "column",
        }}
      >
        <label>
          Discount (%)
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            style={{ width: "var(--size-700)", marginLeft: "var(--size-200)" }}
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "var(--size-1000)", marginLeft: "var(--size-200)" }}
          />
        </label>
      </div>
      <PrimaryButton
        onClick={handleGenerateReceipt}
        style={{ marginTop: "var(--size-500)" }}
      >
        Generate Receipt
      </PrimaryButton>
    </div>
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
    <table style={{ flex: 1 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Name</th>
          <th style={{ textAlign: "right" }}>Price</th>
          <th style={{ textAlign: "center" }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={startIndex + index}>
            <td>{item.name}</td>
            <td style={{ textAlign: "right" }}>
              {item.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </td>
            <td style={{ minWidth: "var(--size-900)", textAlign: "center" }}>
              <DecrementButton
                onClick={() => handleQuantityChange(startIndex + index, -1)}
              >
                -
              </DecrementButton>
              <span style={{ margin: "0 var(--size-200)" }}>
                {quantities[startIndex + index]}
              </span>
              <IncrementButton
                onClick={() => handleQuantityChange(startIndex + index, 1)}
              >
                +
              </IncrementButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
