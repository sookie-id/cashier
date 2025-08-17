import { useState } from "react";
import logo from "./logo.png";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { getCssVar } from "./getCssVar";

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
  const itemList = defaultItemList;

  return (
    <div className="app">
      {receiptData ? (
        <Receipt
          purchasedItems={receiptData.purchasedItems}
          receiptData={receiptData}
          onClose={() => setReceiptData(null)}
        />
      ) : (
        <Menu
          onGenerateReceipt={setReceiptData}
          itemList={itemList}
        />
      )}
    </div>
  );
}

export function Menu({ onGenerateReceipt, itemList }) {
  const [quantities, setQuantities] = useState(Array(itemList.length).fill(0));
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (index, delta) => {
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
      {useMediaQuery(`(max-width: ${getCssVar("--size-1500")})`) ? (
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
          gap: "var(--size-400)",
        }}
      >
        <label>
          Discount (%):
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            style={{ width: "60px", marginLeft: "8px" }}
          />
        </label>
      </div>
      <button
        className="primary-button"
        onClick={handleGenerateReceipt}
        style={{ marginTop: "24px" }}
      >
        Generate Receipt
      </button>
    </div>
  );
}

function MenuColumn({ items, startIndex, quantities, handleQuantityChange }) {
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
            <td style={{ minWidth: "90px", textAlign: "center" }}>
              <button
                className="decrement-button"
                onClick={() => handleQuantityChange(startIndex + index, -1)}
              >
                -
              </button>
              <span style={{ margin: "0 8px" }}>
                {quantities[startIndex + index]}
              </span>
              <button
                className="increment-button"
                onClick={() => handleQuantityChange(startIndex + index, 1)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Receipt({ purchasedItems, receiptData, onClose }) {
  const receiptRef = useRef(null);

  const [phone, setPhone] = useState("");

  const { total, discount, discountAmount, totalAfterDiscount } = receiptData;

  const handleSendToWhatsApp = async () => {
    // Export receipt as image
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Convert base64 image to blob
    const response = await fetch(imgData);
    const blob = await response.blob();

    try {
      // Write image to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Failed to copy image. Please try again or use download instead.");
    }

    // Open WhatsApp with phone number
    let phoneNumber = phone.trim();
    if (!phoneNumber) return;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "62" + phoneNumber.slice(1);
    }
    const waUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <div
        className="receipt"
        style={{ maxWidth: "250px", margin: "0 auto", padding: "30px 0px" }}
        ref={receiptRef}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
        </div>
        <div
          style={{
            fontFamily: "Robotto",
            textAlign: "center",
            margin: "16px 0",
          }}
        >
          <p>Jl. Kebagusan Raya No. 17, Pasar Minggu, Jakarta Selatan</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 10px",
          }}
        >
          <span style={{ fontFamily: "Robotto" }}>
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span style={{ fontFamily: "Robotto" }}>
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Item</th>
              <th style={{ textAlign: "center" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {purchasedItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>
                  {item.subtotal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} style={{ textAlign: "left", fontWeight: "bold" }}>
                Total
              </td>
              <td style={{ textAlign: "right", fontWeight: "bold" }}>
                {total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
            {discount > 0 && (
              <>
                <tr>
                  <td colSpan={2} style={{ textAlign: "left" }}>
                    Discount ({discount}%)
                  </td>
                  <td style={{ textAlign: "right", color: "red" }}>
                    -
                    {discountAmount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    Total After Discount
                  </td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>
                    {totalAfterDiscount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div
          style={{
            fontFamily: "Robotto",
            lineHeight: "1.2",
            margin: "24px 0",
            textAlign: "center",
            fontSize: "1.1em",
          }}
        >
          <p>
            Terima kasih! Selamat menikmati.
            <br />
            Ditunggu kedatangannya kembali.
          </p>
          <p>
            Kritik dan Saran:
            <br />
            0831 0729 4243 / Instagram: @sookie_id
          </p>
        </div>
      </div>
      <div
        className="receipt-actions"
        style={{ textAlign: "center", marginTop: "16px" }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button className="primary-button" onClick={() => window.print()}>
            Print
          </button>
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            style={{ width: "140px" }}
          />
          <button className="wa-button" onClick={handleSendToWhatsApp}>
            Send to WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
