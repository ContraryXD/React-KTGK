"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export function searchProducts(query, limit = 10) {
  return axios
    .get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      return { products: [], total: 0 };
    });
}

export default function SearchResultsPage() {
  const params = useParams();
  const { query } = params;
  const [results, setResults] = useState({ products: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      searchProducts(decodeURIComponent(query))
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container">
      <h1>Search Results for &quot;{decodeURIComponent(query)}&quot;</h1>
      <p>{results.total} products found</p>
      <div className="row">
        {results.products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
