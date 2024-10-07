import React, { useState } from 'react';
import axios from 'axios';
import '../Footer.css';  // Import the CSS file for footer styles
import logo from '../images/Logo.png';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/ecommerce-site/src/Backend/contact_submit.php', formData);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <footer className="footer-section">
      <div className="cta-text text-center mb-4">
        <h4>Find us</h4>
        <span>1010 Avenue, SW 54321, Casablanca</span>
      </div>
      <div className="map-container mt-3 mb-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.70261828904!2d-7.586992499999999!3d33.572287499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sen!2sma!4v1721187614631!5m2!1sen!2sma"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="container">
        <div className="footer-content pt-4 pb-4">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="/"><img src={logo} className="img-fluid" alt="Himmi Shop Logo" /></a>
                </div>
                <div className="footer-text">
                  <p>At Himmi Shop, we believe in delivering excellence. Founded with a vision to provide top-quality products at competitive prices, 
                      we have been serving happy customers worldwide. Our commitment to quality and customer service sets us apart in the e-commerce industry.
                       Whether you're shopping for yourself or looking for the perfect gift, Himmi Shop has something for everyone.</p>
                </div>
                <div className="footer-social-icon">
                  <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                  <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                  <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#contact-form">Contact</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Contact us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50" id="contact-form">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Contact Support</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                </div>
                {submitted ? (
                  <div className="alert alert-success" role="alert">
                    Thank you for reaching out to us! We will get back to you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info pt-5 pb-5">
          <div className="row">
            <div className="col-lg-4">
              <h4>Address</h4>
              <p>1010 Avenue, SW 54321, Casablanca</p>
            </div>
            <div className="col-lg-4">
              <h4>Phone</h4>
              <p>+212 661890372</p>
            </div>
            <div className="col-lg-4">
              <h4>Email</h4>
              <p>HIMMISHOP@ecommerce.eco</p>
            </div>
          </div>
        </div>

        <div className="copyright-area text-center">
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright-text">
                © 2024 <a href="#">Himmi Shop</a>. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
