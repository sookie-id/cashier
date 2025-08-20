import html2canvas from "html2canvas";
import { useRef } from "react";
import type { ReceiptData } from "../../../types";
import logo from "./logo.png";
import { HeaderContainer, ReceiptContainer } from "./Receipt.styled";

export default function Receipt({
  receiptData,
  onClose,
  phone,
}: {
  receiptData: ReceiptData;
  onClose: () => void;
  phone: string;
}) {
  const receiptRef = useRef(null);

  const {
    total,
    discount,
    discountAmount,
    totalAfterDiscount,
    purchasedItems,
  } = receiptData;

  const handleSendToWhatsApp = async () => {
    if (!receiptRef.current) return;

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
      <ReceiptContainer ref={receiptRef}>
        <HeaderContainer>
          <img src={logo} alt="Logo" />
          <p>Jl. Kebagusan Raya No. 17, Pasar Minggu, Jakarta Selatan</p>
        </HeaderContainer>
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
      </ReceiptContainer>
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

        {phone && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button className="wa-button" onClick={handleSendToWhatsApp}>
              Send to WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
