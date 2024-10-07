import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();  // Get product ID from URL params
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState('');
  const [existingPhoto, setExistingPhoto] = useState(''); // To hold the existing photo URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/ecommerce-site/src/Backend/get_products.php?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.message) {
          throw new Error(data.message);
        }
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setCategory(data.category);
        setExistingPhoto(data.photo);  
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission for updating the product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', Number(stock));  // Convert stock to a number
    formData.append('category', category);
    if (photo) {
      formData.append('photo', photo);  // Append new photo if provided
    }

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/update_product.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.message) {
        throw new Error(result.message);
      }

      // Navigate to ProductManagement after successful update
      navigate('/admin/ProductManagement');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="Product Price"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-control"
            placeholder="Product Stock"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Select Category</option>
            <option value="Femme">Femme</option>
            <option value="Homme">Homme</option>
            <option value="Electronique">Electronique</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="photo">Photo:</label>
          {existingPhoto && (
            <div>
              <img src={existingPhoto} alt="Product" style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
            </div>
          )}
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
