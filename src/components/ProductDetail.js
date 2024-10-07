import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import { CartContext } from './CartContext';
import '../productDetails.css'; // Import the custom CSS file

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/ecommerce-site/src/Backend/get_product.php?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, size: selectedSize });
      console.log(`Product "${product.name}" with size "${selectedSize}" added to cart!`);
    } else {
      console.log('Please select a size before adding to cart.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={`http://localhost/ecommerce-site/src/Backend/uploads/${product.photo}`}
          className="product-image object-cover w-full h-auto"
          alt={product.name}
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-green-500 text-2xl font-bold mb-4">{product.price}dhs</p>
          <div className="size-selection mb-4 flex flex-wrap gap-2">
            {product.availableSizes && product.availableSizes.map(size => (
              <button
                key={size}
                className={`btn btn-size ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {user && user.role === 'client' && (
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          )}
          <Link to="/" className="btn btn-secondary mt-4">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
