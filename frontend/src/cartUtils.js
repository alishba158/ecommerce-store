// Cart ko localStorage se nikalna
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Cart mein item add karna
export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

// Cart se item remove karna
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

// Quantity increase karna
export const increaseQty = (productId) => {
  const cart = getCart();
  const item = cart.find((item) => item._id === productId);
  if (item) item.qty += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Quantity decrease karna (1 se kam nahi hogi)
export const decreaseQty = (productId) => {
  const cart = getCart();
  const item = cart.find((item) => item._id === productId);
  if (item && item.qty > 1) item.qty -= 1;
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Cart mein total items count
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
};