import React, { useState } from 'react';

const ProductUpload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState('');
  const [size, setSize] = useState(''); // Will now be used for options like Slim, Basic
  const [storage, setStorage] = useState(''); // New state for storage options
  const [message, setMessage] = useState('');

  // Define available sizes and storage options
  const sizes = ['Slim', 'Basic','S','M','XXL','XL' ,'L'];


  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('photo', photo);
    formData.append('category', category);
    formData.append('size', size);
    formData.append('storage', storage); // Include storage in the FormData

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/upload_product.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
      // Clear input fields after successful upload
      if (response.ok) {
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setPhoto(null);
        setCategory('');
        setSize('');
        setStorage(''); // Clear storage field
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Upload Product</h3>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productStock" className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control"
            id="productStock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">Category:</label>
          <select
            className="form-control"
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Femme">Femme</option>
            <option value="Homme">Homme</option>
            <option value="Electronique">Electronique</option>
            <option value="Kids">Kids</option>
            <option value="Created by Himmi Shop">Created by Himmi Shop</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="productSize" className="form-label">Size:</label>
          <select
            className="form-control"
            id="productSize"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="">Select size</option>
            {sizes.map((sizeOption, index) => (
              <option key={index} value={sizeOption}>{sizeOption}</option>
            ))}
          </select>
        </div>
       
        <div className="mb-3">
          <label htmlFor="productPhoto" className="form-label">Photo:</label>
          <input
            type="file"
            className="form-control"
            id="productPhoto"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductUpload;
