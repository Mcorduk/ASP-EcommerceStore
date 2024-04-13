import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface PropsType {
  products: Product[];
}

export default function ProductList({ products }: PropsType) {
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => (
        <Grid key={product.id} item xs={8} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
