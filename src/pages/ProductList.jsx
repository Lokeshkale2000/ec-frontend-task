import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://intern-task-api.bravo68web.workers.dev/api/products',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://intern-task-api.bravo68web.workers.dev/api/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmail(response.data.user.sub);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

   
    const timer = setTimeout(() => {
      fetchProducts();
      fetchUser();
    }, 2000);

   
    return () => clearTimeout(timer);

  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const productsPerPage = 8;
  const productsToDisplay = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex flex-col h-screen">
      <Header email={email} />
      <main className="flex-grow flex flex-col p-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default ProductList;
