import { size, useFloating } from "@floating-ui/react";
import { useEffect, useState } from "react";
import EditableText from "../../shared/components/EditableText";
import {
  IconCheveronDown,
  IconCheveronUp,
} from "../../shared/components/Icon.styled";
import Input from "../../shared/components/Input";
import { getProducts } from "../api/get-products";
import { addProduct } from "../workflow/add-product";
import { updateProductName } from "../workflow/update-product-name";
import { updateProductPrice } from "../workflow/update-product-price";
import {
  H1,
  InputContainer,
  MenuTable,
  PageContainer,
  ResponsiveMenuContainer,
  SubmitButton,
} from "./Menu.styled";
import type { Product } from "./types";
import VariationModal from "./VariationModal";

export default function Menu() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [openVariationModal, setOpenVariationModal] = useState(false);

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
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    const tr = event.currentTarget.closest("tr") as HTMLElement | null;
    console.log(tr);
    if (tr) {
      variationModalRefs.setReference(tr);
      setOpenVariationModal(true);
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

  // Split the itemList into two columns
  const mid = Math.ceil(products.length / 2);
  const leftItems = products.slice(0, mid);
  const rightItems = products.slice(mid);

  return (
    <PageContainer>
      <H1>Menu</H1>
      <ResponsiveMenuContainer>
        <MenuColumn
          items={leftItems}
          startIndex={0}
          onClickDropdown={handleClickDropdown}
          onCloseDropdown={handleCloseDropdown}
        />
        <MenuColumn
          items={rightItems}
          startIndex={mid}
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

      {openVariationModal && (
        <VariationModal
          style={floatingStyles}
          ref={variationModalRefs.setFloating}
        />
      )}
    </PageContainer>
  );
}

function MenuColumn({
  items,
  startIndex,
  onClickDropdown,
  onCloseDropdown,
}: {
  items: Product[];
  startIndex: number;
  onClickDropdown: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onCloseDropdown: () => void;
}) {
  const [dropdownActiveIndex, setDropdownActiveIndex] = useState<number | null>(
    null
  );

  // Close variation modal on screen resize
  useEffect(() => {
    const handleResize = () => {
      handleCloseDropdown();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickDropdown = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ): void => {
    setDropdownActiveIndex(index);
    onClickDropdown(event);
  };

  const handleCloseDropdown = (): void => {
    setDropdownActiveIndex(null);
    onCloseDropdown();
  };

  return (
    <MenuTable>
      <tbody>
        {items.map((item, index) => (
          <tr key={startIndex + index}>
            <td>
              <EditableText
                onSave={(name: string) =>
                  updateProductName({
                    id: item.id,
                    name,
                  })
                }
                value={item.name}
              />
            </td>
            <td>
              <EditableText
                onSave={(price: string) =>
                  updateProductPrice({
                    id: item.id,
                    price: Number(price),
                  })
                }
                type="number"
                formatDisplayValue={(value: string) =>
                  Number(value).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }
                value={item.price.toString()}
                step="1000"
              />
            </td>
            <td>
              {/* <a href="#">
                <IconVisible width={24} />
              </a> */}
              {/* <a href="#">
                <IconHidden width={24} />
              </a> */}
              {index !== dropdownActiveIndex && (
                <a onClick={(event) => handleClickDropdown(event, index)}>
                  <IconCheveronDown width={24} />
                </a>
              )}
              {index === dropdownActiveIndex && (
                <a onClick={handleCloseDropdown}>
                  <IconCheveronUp width={24} />
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </MenuTable>
  );
}
