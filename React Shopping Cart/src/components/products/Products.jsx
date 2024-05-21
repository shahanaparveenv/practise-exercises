import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingCard from "./LoadingCard";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/products");
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  //console.log(products[0]);
  return (
    <div className="p-10 mt-20 w-full grid gap-6 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {loading ? (
        <>
          <LoadingCard/>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      ) : (
        products.map((prod) => <ProductCard prod={prod} key={prod.id} />)
      )}
    </div>
  );
}
export default Products;
