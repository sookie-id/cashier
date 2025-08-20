import { useEffect, useState, type JSX } from "react";
import { redirect } from "react-router";
import { getProducts, getSession } from "../../auth/persistence/get-session";
import type { Product, ReceiptData } from "../../types";
import Receipt from "./components/Receipt";
import Transaction from "./components/Transaction";
import "./create-transaction.css";

export async function clientLoader() {
  const session = await getSession();

  if (!session) {
    throw redirect("/login");
  }
}

export default function CreateTransaction() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  let content: JSX.Element;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (receiptData) {
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
