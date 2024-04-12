import { List } from "@mui/material";
import { Product } from "../../../product";
import ProductCard from "./ProductCard";

interface PropsType {
  products: Product[];
}

export default function ProductList({ products }: PropsType) {
  return (
    <List>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </List>
  );
}
