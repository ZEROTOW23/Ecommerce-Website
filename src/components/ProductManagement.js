import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_products.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/admin/EditProduct/${productId}`);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/delete_product.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${productId}`,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.message === 'Product deleted successfully') {
        setProducts(products.filter(product => product.id !== productId));
      } else {
        console.error('Error deleting product:', result.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Products</h3>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={`http://localhost/ecommerce-site/src/Backend/uploads/${product.photo}`}
                      className="img-thumbnail"
                      alt={product.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price} dhs</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button
              className="btn btn-success"
              onClick={() => navigate('/admin/UploadProduct')}
            >
              Add New Product
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
