import { useEffect, useState } from "react";
import { Product } from "../../product";
import Catalog from "../../features/catalog/catalog";

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
      <h1> Ecommerce Store</h1>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}
export default App;
