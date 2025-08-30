export type ReceiptData = {
    total: number;
    discount: number;
    discountAmount: number;
    totalAfterDiscount: number;
    purchasedItems: { name: string; quantity: number; subtotal: number }[];
};
  
export type Product = {
  id: number;
  name: string;
  price: number;
};
  