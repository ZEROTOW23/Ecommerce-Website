import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png'; // Adjust the path as needed
import { FaTachometerAlt, FaBoxOpen, FaUpload, FaUsers, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/dashboard">
          <img src={logo} style={{ height: '40px', marginRight: '10px' }} alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarAdminNav" aria-controls="navbarAdminNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarAdminNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin"><FaTachometerAlt style={{ marginRight: '5px' }} /> Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/ProductManagement"><FaBoxOpen style={{ marginRight: '5px' }} /> Manage Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/UploadProduct"><FaUpload style={{ marginRight: '5px' }} /> Upload Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users"><FaUsers style={{ marginRight: '5px' }} /> Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/messages"><FaEnvelope style={{ marginRight: '5px' }} /> Support Messages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders"><FaShoppingCart style={{ marginRight: '5px' }} /> Orders</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
