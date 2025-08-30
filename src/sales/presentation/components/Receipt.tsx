import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  PrimaryButton,
  SecondaryButton,
  WhatsAppButton,
} from "../../../shared/components/Button.styled";
import type { ReceiptData } from "../../../types/presentation.types";
import logo from "./logo.png";
import {
  ButtonContainer,
  DateTimeContainer,
  FooterContainer,
  HeaderContainer,
  ReceiptActionContainer,
  ReceiptContainer,
  ReceiptTable,
  WhatsAppButtonContainer,
} from "./Receipt.styled";

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
        <DateTimeContainer>
          <span>
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </DateTimeContainer>
        <ReceiptTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {purchasedItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  {item.subtotal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="total">
                Total
              </td>
              <td className="total">
                {total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
            {discount > 0 && (
              <>
                <tr>
                  <td colSpan={2}>Discount ({discount}%)</td>
                  <td className="discount-amount">
                    -
                    {discountAmount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="total">
                    Total After Discount
                  </td>
                  <td className="total">
                    {totalAfterDiscount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </ReceiptTable>
        <FooterContainer>
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
        </FooterContainer>
      </ReceiptContainer>
      <ReceiptActionContainer>
        <ButtonContainer>
          <PrimaryButton onClick={() => window.print()}>Print</PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ButtonContainer>

        {phone && (
          <WhatsAppButtonContainer>
            <WhatsAppButton onClick={handleSendToWhatsApp}>
              Send to WhatsApp
            </WhatsAppButton>
          </WhatsAppButtonContainer>
        )}
      </ReceiptActionContainer>
    </>
  );
}
