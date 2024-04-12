import { Button } from "@mui/material";
import { Product } from "../../../product";
import ProductList from "./ProductList";

interface PropsType {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: PropsType) {
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
}
