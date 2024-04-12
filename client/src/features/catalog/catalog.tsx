import { Product } from "../../product";

interface PropsType {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: PropsType) {
  return (
    <>
      <ul>
        {products.map((product: Product) => (
          <li key={product.name}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct} type="button">
        Add product
      </button>
    </>
  );
}
