import { useState } from "react";
import Receipt from "./Receipt";
import Transaction from "./Transaction";

const defaultItemList = [
  { name: "Soft Cookie 1 pcs", price: 20_000 },
  { name: "Soft Cookies 3 pcs", price: 55_000 },
  { name: "Soft Cookies 6 pcs", price: 100_000 },
  { name: "Soft Cookies 12 pcs", price: 190_000 },
  { name: "Tiramisu", price: 35_000 },
  { name: "Banana Milk", price: 35_000 },
  { name: "Brookies", price: 18_000 },
  { name: "Milo Dinosaur", price: 22_000 },
  { name: "Matcha Latte", price: 28_000 },
  { name: "Aren Latte", price: 25_000 },
  { name: "Cold Brew", price: 20_000 },
  { name: "Kefir", price: 28_000 },
  { name: "Mineral Water", price: 8_000 },
];

export default function App() {
  const [receiptData, setReceiptData] = useState(null);
  const [phone, setPhone] = useState("");
  const itemList = defaultItemList;

  return (
    <div className="app">
      {receiptData ? (
        <Receipt
          purchasedItems={receiptData.purchasedItems}
          receiptData={receiptData}
          phone={phone}
          onClose={() => setReceiptData(null)}
        />
      ) : (
        <Transaction
          onGenerateReceipt={setReceiptData}
          itemList={itemList}
          phone={phone}
          setPhone={setPhone}
        />
      )}
    </div>
  );
}

