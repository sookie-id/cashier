import { useEffect, useState, type JSX } from "react";
import Receipt from "./Receipt";
import Transaction from "./Transaction";
import type { Product, ReceiptData } from "./types";
import { supabase } from "./supabaseClient";

export default function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await supabase.from("products").select();
    setProducts(data);
  }

  let content: JSX.Element;

  if (receiptData) {
    content = (
      <Receipt
        receiptData={receiptData}
        phone={phone}
        onClose={() => setReceiptData(null)}
      />
    );
  } else if (products) {
    content = (
      <Transaction
        onGenerateReceipt={setReceiptData}
        itemList={products}
        phone={phone}
        setPhone={setPhone}
      />
    );
  } else {
    content = <p>No products available</p>;
  }

  return <div className="app">{content}</div>;
}
