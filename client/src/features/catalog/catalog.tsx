import { Product } from "../../product";

interface PropsType {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog(props: PropsType) {
  return (
    <>
      <ul>
        {props.products.map((product: Product) => (
          <li key={product.name}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={props.addProduct} type="button">
        Add product
      </button>
    </>
  );
}
