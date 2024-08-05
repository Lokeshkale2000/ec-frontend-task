import React from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <div className="price-tag">${product.price}</div>
      </div>
      <h3 className="product-title">{product.title}</h3>
    </div>
  );
};

export default ProductCard;
