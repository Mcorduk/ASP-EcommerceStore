import { useEffect, useState } from "react";
import { Product } from "../../product";
import Catalog from "../../features/catalog/catalog/catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: `product ${prevState.length + 1}`,
        price: 300.0,
        brand: "brand",
        description: "description",
        pictureUrl: "https://example.com",
      },
    ]);
  }

  return (
    <div className="app">
      <Typography variant="h1"> Ecommerce Store</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}
export default App;
