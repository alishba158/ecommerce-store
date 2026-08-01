import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';

function Dashboard() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const subTextColor = darkMode ? '#aaaaaa' : '#666666';

  return (
    <div style={{ padding: '30px', minHeight: '100vh', background: bgColor, transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: textColor }}>Welcome, {userName} 👋</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '10px 20px',
              background: darkMode ? '#ffd700' : '#333',
              color: darkMode ? '#333' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              height: 'fit-content',
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                height: 'fit-content',
              }}
            >
              ➕ Add Product
            </button>
          )}

          <button
            onClick={() => navigate('/cart')}
            style={{
              padding: '10px 20px',
              background: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              height: 'fit-content',
            }}
          >
            🛒 Cart
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#764ba2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              height: 'fit-content',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <h2 style={{ marginTop: '30px', color: textColor }}>Our Products</h2>

      <input
        type="text"
        placeholder="🔍 Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '12px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '6px',
          border: darkMode ? '1px solid #444' : '1px solid #ccc',
          marginTop: '15px',
          marginBottom: '10px',
          background: darkMode ? '#16213e' : 'white',
          color: textColor,
          fontSize: '14px',
          outline: 'none',
        }}
      />

      {loading ? (
        <p style={{ color: textColor }}>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ color: textColor, marginTop: '20px' }}>No products found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              style={{
                cursor: 'pointer',
                border: darkMode ? '1px solid #333' : '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                textAlign: 'center',
                background: cardBg,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', borderRadius: '6px', marginBottom: '10px' }}
              />
              <h3 style={{ color: textColor }}>{product.name}</h3>
              <p style={{ color: subTextColor, fontSize: '14px' }}>{product.description}</p>
              <p style={{ fontWeight: 'bold', marginTop: '8px', color: textColor }}>Rs. {product.price}</p>
              <p style={{ fontSize: '13px', color: subTextColor }}>Stock: {product.stock}</p>

              {userRole === 'admin' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
                  <button
                    onClick={(e) => handleEdit(e, product._id)}
                    style={{
                      padding: '6px 14px',
                      background: '#f0ad4e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, product._id)}
                    style={{
                      padding: '6px 14px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;