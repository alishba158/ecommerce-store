import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToCart } from '../cartUtils';
import { useTheme } from '../ThemeContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const subTextColor = darkMode ? '#aaaaaa' : '#666666';

  if (loading)
    return (
      <div style={{ minHeight: '100vh', background: bgColor, paddingTop: '50px' }}>
        <p style={{ textAlign: 'center', color: textColor }}>Loading...</p>
      </div>
    );
  if (!product)
    return (
      <div style={{ minHeight: '100vh', background: bgColor, paddingTop: '50px' }}>
        <p style={{ textAlign: 'center', color: textColor }}>Product not found</p>
      </div>
    );

  return (
    <div style={{ padding: '30px', minHeight: '100vh', background: bgColor }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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

        <div
          style={{
            background: cardBg,
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '250px', borderRadius: '8px', marginBottom: '20px' }}
          />
          <h1 style={{ color: textColor }}>{product.name}</h1>
          <p style={{ color: subTextColor, margin: '15px 0' }}>{product.description}</p>
          <h2 style={{ color: '#764ba2' }}>Rs. {product.price}</h2>
          <p style={{ marginTop: '10px', color: subTextColor }}>Stock available: {product.stock}</p>

          <button
            onClick={() => {
              addToCart(product);
              alert(`${product.name} added to cart!`);
            }}
            style={{
              marginTop: '20px',
              padding: '12px 30px',
              background: '#764ba2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;