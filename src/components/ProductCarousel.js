import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../ProductCarousel.css';

const ProductCarousel = ({ products }) => {
  return (
    <Carousel fade>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <div className="carousel-item-content">
            <img
              src={`http://localhost/ecommerce-site/src/Backend/uploads/${product.photo}`}
              className="product-image"
              alt={product.name}
            />
            <div className="carousel-caption-content">
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p className="price">{product.price}dhs</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
