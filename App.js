import { useEffect, useState } from "react";
import { PAGE_SIZE } from "./constants";
import ProductCard from "./components/productCard";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const gotonextpage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const gotopreviouspage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div className="App">
      <h1>Products List</h1>
      <div className="paginationcontainer">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => gotopreviouspage()}
        >
          ⬅
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            className={"page-number" + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          className="page-number"
          onClick={() => gotonextpage()}
        >
          ➡
        </button>
      </div>

      <h2>Pagination</h2>
      <div className="productcontainer">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
