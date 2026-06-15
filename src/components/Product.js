import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { add } from '../Store/CartSlice';

const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products.map(product => (
    <div className="col-md-4 d-flex align-items-stretch mb-4" key={product.id}>
      <Card className="shadow-sm h-100" style={{ borderRadius: '16px' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{
            height: '220px',
            objectFit: 'contain',
            background: '#f8f9fa',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ fontSize: '1.1rem', fontWeight: 'bold', minHeight: '48px' }}>
            {product.title}
          </Card.Title>
          <Card.Text style={{ color: '#555', fontSize: '0.95rem', minHeight: '60px' }}>
            {product.description.substring(0, 60)}...
          </Card.Text>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span style={{ fontWeight: 'bold', color: '#007bff', fontSize: '1.1rem' }}>
              INR: {product.price}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center" style={{ fontWeight: '700', letterSpacing: '1px' }}>
        Product Dashboard
      </h1>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>}
      <div className="row">
        {cards}
      </div>
    </div>
  );
};

export default Product;