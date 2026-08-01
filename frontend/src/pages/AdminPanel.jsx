import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function AdminPanel() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Product "${data.name}" added successfully!`);
        setFormData({ name: '', description: '', price: '', image: '', stock: '' });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Check if backend is running.');
    }
  };

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';

  const inputStyle = {
    padding: '12px',
    border: darkMode ? '1px solid #444' : '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    background: darkMode ? '#0f1729' : 'white',
    color: textColor,
  };

  return (
    <div style={{ padding: '30px', minHeight: '100vh', background: bgColor }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
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
          ← Back to Dashboard
        </button>

        <div
          style={{
            background: cardBg,
            borderRadius: '10px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: textColor }}>➕ Add New Product</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...inputStyle, minHeight: '70px' }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (Rs.)"
              value={formData.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                padding: '12px',
                background: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '15px',
                marginTop: '5px',
              }}
            >
              Add Product
            </button>
          </form>

          {message && <p style={{ marginTop: '15px', fontWeight: 'bold', color: textColor }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;