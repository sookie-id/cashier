import { size, useFloating } from "@floating-ui/react";
import { useEffect, useState } from "react";
import Input from "../../shared/components/Input";
import { getProducts, type Product } from "../workflow/get-products";
import { addProduct } from "../workflow/add-product";
import {
  H1,
  InputContainer,
  PageContainer,
  ResponsiveMenuContainer,
  SubmitButton,
} from "./Menu.styled";
import { MenuColumn } from "./MenuColumn";
import VariationModal from "./VariationModal";

export default function Menu() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [openVariationModal, setOpenVariationModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const { refs: variationModalRefs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const handleClickDropdown = (
    event: React.MouseEvent<HTMLAnchorElement>,
    productId: number
  ): void => {
    const tr = event.currentTarget.closest("tr") as HTMLElement | null;
    console.log(tr);
    if (tr) {
      variationModalRefs.setReference(tr);
      setOpenVariationModal(true);
      setSelectedProductId(productId);
    }
  };

  const handleCloseDropdown = (): void => {
    setOpenVariationModal(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ name: productName, price });
    await fetchProducts();
  };

  if (!products) {
    return;
  }

  // Split the product list into two columns
  const mid = Math.ceil(products.length / 2);
  const leftProducts = products.slice(0, mid);
  const rightProducts = products.slice(mid);

  return (
    <PageContainer>
      <H1>Menu</H1>
      <ResponsiveMenuContainer>
        <MenuColumn
          products={leftProducts}
          onClickDropdown={handleClickDropdown}
          onCloseDropdown={handleCloseDropdown}
        />
        <MenuColumn
          products={rightProducts}
          onClickDropdown={handleClickDropdown}
          onCloseDropdown={handleCloseDropdown}
        />
      </ResponsiveMenuContainer>
      <form onSubmit={handleAddProduct}>
        <InputContainer>
          <Input
            label="Product Name"
            type="text"
            onChangeValue={setProductName}
            required
          ></Input>
          <Input
            label="Price"
            type="number"
            min="0"
            step="1000"
            onChangeValue={(value) => setPrice(Number(value))}
            required
          ></Input>
        </InputContainer>
        <SubmitButton type="submit">Add Product</SubmitButton>
      </form>

      {openVariationModal && selectedProductId && (
        <VariationModal
          style={floatingStyles}
          ref={variationModalRefs.setFloating}
          productId={selectedProductId}
        />
      )}
    </PageContainer>
  );
}
