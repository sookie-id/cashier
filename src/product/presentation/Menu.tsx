import { useEffect, useState } from "react";
import EditableText from "../../shared/components/EditableText";
import Input from "../../shared/components/Input";
import { getProducts } from "../api/get-products";
import { addProduct } from "../workflow/add-product";
import { updateProductName } from "../workflow/update-product-name";
import { updateProductPrice } from "../workflow/update-product-price";
import {
  DoubleColumnMenuContainer,
  H1,
  InputContainer,
  MenuTable,
  PageContainer,
  SingleColumnMenuContainer,
  SubmitButton,
} from "./Menu.styled.";
import type { Product } from "./types";

export default function Menu() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);

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
      <SingleColumnMenuContainer>
        <MenuColumn items={products} startIndex={0} />
      </SingleColumnMenuContainer>
      <DoubleColumnMenuContainer>
        <MenuColumn items={leftItems} startIndex={0} />
        <MenuColumn items={rightItems} startIndex={mid} />
      </DoubleColumnMenuContainer>
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
    </PageContainer>
  );
}

function MenuColumn({
  items,
  startIndex,
}: {
  items: Product[];
  startIndex: number;
}) {
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
              ></EditableText>
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
              ></EditableText>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </MenuTable>
  );
}
