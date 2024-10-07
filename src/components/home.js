import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import { CartContext } from './CartContext';
import ProductCarousel from './ProductCarousel';
import '../home.css';
import Footer from './Footer';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import aboutUsImage from '../images/Aboutusimage.png';
import adsImage from '../images/ADS.jpeg';  // Add this import for the new ads image
import deliveryImage from '../images/1.png';  // Add this import for the delivery image

const Home = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductSizes, setSelectedProductSizes] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost/ecommerce-site/src/Backend/get_products.php?category=${encodeURIComponent(selectedCategory)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format');
        }
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();

    const intervalId = setInterval(fetchProducts, 30000);

    return () => clearInterval(intervalId);
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchQuery]);

  const handleAddToCart = (product) => {
    const sizes = selectedProductSizes[product.id] || [];

    if (sizes.length > 0) {
      sizes.forEach(size => addToCart({ ...product, size }));
      console.log(`Product "${product.name}" with sizes "${sizes.join(', ')}" added to cart!`);
      setSelectedProductSizes(prev => ({ ...prev, [product.id]: [] }));
    } else {
      console.log('Please select at least one size before adding to cart.');
    }
  };

  const handleSizeClick = (productId, size) => {
    setSelectedProductSizes(prev => {
      const sizes = prev[productId] || [];
      if (sizes.includes(size)) {
        return { ...prev, [productId]: sizes.filter(s => s !== size) };
      } else {
        return { ...prev, [productId]: [...sizes, size] };
      }
    });
  };

  const bannerProducts = products.slice(0, 3);

  return (
    <div className="home">
      <div className="header-container bg-cover bg-center flex items-center justify-center text-white h-screen">
        <div className="text-center content w-full">
          <ProductCarousel products={bannerProducts} />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <h3 className="text-3xl mb-6">Product List</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="category-buttons flex justify-center mb-8">
          <button className={`btn ${selectedCategory === '' ? 'active' : ''}`} onClick={() => setSelectedCategory('')}>
            All Categories
          </button>
          <button className={`btn ${selectedCategory === 'Femme' ? 'active' : ''}`} onClick={() => setSelectedCategory('Femme')}>
            Femme
          </button>
          <button className={`btn ${selectedCategory === 'Homme' ? 'active' : ''}`} onClick={() => setSelectedCategory('Homme')}>
            Homme
          </button>
          <button className={`btn ${selectedCategory === 'Electronique' ? 'active' : ''}`} onClick={() => setSelectedCategory('Electronique')}>
            Electronique
          </button>
          <button className={`btn ${selectedCategory === 'Kids' ? 'active' : ''}`} onClick={() => setSelectedCategory('Kids')}>
            Kids
          </button>
          <button className={`btn ${selectedCategory === 'Created by Himmi Shop' ? 'active' : ''}`} onClick={() => setSelectedCategory('Created by Himmi Shop')}>
            Created by Himmi Shop
          </button>
        </div>
        <div className="search-bar mb-6 flex items-center justify-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={`/search?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`} className="btn btn-search ml-2">Search</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card product-card rounded-lg shadow-lg">
              <Link to={`/product/${product.id}`}>
                <img
                  src={`http://localhost/ecommerce-site/src/Backend/uploads/${product.photo}`}
                  className="card-img-top product-image"
                  alt={product.name}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text price">{product.price} dhs</p>
                <div className="size-selection mb-2 flex flex-wrap gap-2 justify-center">
                  {product.size && product.size.split(',').map(size => (
                    <button
                      key={size}
                      className={`btn btn-size ${selectedProductSizes[product.id]?.includes(size) ? 'selected' : ''}`}
                      onClick={() => handleSizeClick(product.id, size)}
                    >
                      {selectedProductSizes[product.id]?.includes(size) ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaCircle className="text-gray-500" />
                      )}
                      {size}
                    </button>
                  ))}
                </div>
                {user && user.role === 'client' && (
                  <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-us-container bg-light py-10" id="About Us">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="about-us-image md:w-1/2 mb-6 md:mb-0">
            <img src={aboutUsImage} alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="about-us-description md:w-1/2 md:ml-6 text-center md:text-left">
            <h3 className="text-3xl mb-4">About Us</h3>
            <p className="text-lg mb-4">Welcome to our shop! We are passionate about offering the best products to meet your needs. Our team is dedicated to providing excellent service and high-quality merchandise to ensure a great shopping experience for all our customers.</p>
            <p className="text-lg">Thank you for choosing us, and we hope you enjoy your time shopping here!</p>
          </div>
        </div>
      </div>
      <div className="our-ads-container bg-gray-100 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="ads-image md:w-1/2 mb-6 md:mb-0">
            <img src={adsImage} alt="Our Ads in Street" className="w-full h-60 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="ads-description md:w-1/2 md:ml-6 text-center md:text-left">
            <h3 className="text-3xl mb-4">Our Ads in Street</h3>
            <p className="text-lg">Discover our latest advertisements displayed in various streets. Our ads showcase the newest arrivals and exclusive deals to keep you informed and updated on our latest offerings. Look out for our ads in your area!</p>
          </div>
        </div>
      </div>
      <div className="delivery-info-container bg-light py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="delivery-image md:w-1/2 mb-6 md:mb-0">
            <img src={deliveryImage} alt="How to Deliver Orders" className="w-full h-60 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="delivery-info md:w-1/2 md:ml-6 text-center md:text-left">
            <h3 className="text-3xl mb-4">How to Deliver Orders</h3>
            <p className="text-lg mb-4">We ensure that your orders are delivered promptly and securely. Our delivery process involves thorough handling and tracking to guarantee that your package arrives in perfect condition. Learn more about our delivery methods and how we manage each step to provide you with the best service.</p>
            <p className="text-lg">If you have any questions about the delivery process, feel free to contact our customer service team.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
