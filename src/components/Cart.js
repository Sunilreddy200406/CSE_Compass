import React from 'react';
import { useSelector } from 'react-redux'; 
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { remove } from '../Store/CartSlice.js';
import { useDispatch } from 'react-redux';
const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(remove(id));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center" style={{ fontWeight: '700', letterSpacing: '1px' }}>
        Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map(product => (
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
                      variant="danger"
                      size="sm"
                      onClick={()=>removeFromCart(product.id)} 
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;