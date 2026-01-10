import { useEffect, useState } from "react";
import EditableText from "../../shared/components/EditableText";
import {
  IconCheveronDown,
  IconCheveronUp,
} from "../../shared/components/Icon.styled";
import { updateProduct } from "../workflow/update-product";
import { MenuTable } from "./Menu.styled";
import type { Product } from "../workflow/get-products";

export function MenuColumn({
  products,
  onClickDropdown,
  onCloseDropdown,
}: {
  products: Product[];
  onClickDropdown: (
    event: React.MouseEvent<HTMLAnchorElement>,
    productId: number
  ) => void;
  onCloseDropdown: () => void;
}) {
  const [selectedProductId, setSelecteProductId] = useState<number | null>(
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
    productId: number
  ): void => {
    setSelecteProductId(productId);
    onClickDropdown(event, productId);
  };

  const handleCloseDropdown = (): void => {
    setSelecteProductId(null);
    onCloseDropdown();
  };

  return (
    <MenuTable>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td>
              <EditableText
                onSave={(name: string) =>
                  updateProduct({
                    id: product.id,
                    name,
                  })
                }
                value={product.name}
              />
            </td>
            <td>
              <EditableText
                onSave={(price: string) =>
                  updateProduct({
                    id: product.id,
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
                value={product.price.toString()}
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
              {product.id !== selectedProductId && (
                <a onClick={(event) => handleClickDropdown(event, product.id)}>
                  <IconCheveronDown width={24} />
                </a>
              )}
              {product.id === selectedProductId && (
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
