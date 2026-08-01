import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getCart, removeFromCart, increaseQty, decreaseQty } from '../cartUtils';
import { useTheme } from '../ThemeContext';

function Cart() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [cartItems, setCartItems] = useState(getCart());

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const handleIncrease = (id) => {
    increaseQty(id);
    setCartItems(getCart());
  };

  const handleDecrease = (id) => {
    decreaseQty(id);
    setCartItems(getCart());
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';

  return (
    <div style={{ padding: '30px', minHeight: '100vh', background: bgColor }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginBottom: '20px',
            padding: '8px 16px',
            background: '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Back to Products
        </button>

        <h1 style={{ color: textColor }}>🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p style={{ marginTop: '20px', color: darkMode ? '#aaa' : '#888' }}>Your cart is empty.</p>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: cardBg,
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', borderRadius: '6px' }} />
                  <div>
                    <h3 style={{ margin: 0, color: textColor }}>{item.name}</h3>
                    <p style={{ margin: '5px 0', color: darkMode ? '#aaa' : '#666' }}>Rs. {item.price}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => handleDecrease(item._id)} style={qtyBtnStyle}>
                      −
                    </button>
                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center', color: textColor }}>
                      {item.qty}
                    </span>
                    <button onClick={() => handleIncrease(item._id)} style={qtyBtnStyle}>
                      +
                    </button>
                  </div>

                  <p style={{ fontWeight: 'bold', minWidth: '80px', color: textColor }}>
                    Rs. {item.price * item.qty}
                  </p>

                  <button
                    onClick={() => handleRemove(item._id)}
                    style={{
                      padding: '8px 14px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h2 style={{ marginTop: '20px', textAlign: 'right', color: textColor }}>Total: Rs. {total}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1px solid #764ba2',
  background: 'white',
  color: '#764ba2',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Cart;