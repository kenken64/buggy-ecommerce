import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session for cart storage
app.use(session({
  secret: 'buggy-shop-secret',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Product catalog - note that one product has a string price (BUG!)
const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, color: '#6366f1', icon: 'headphones' },
  { id: 2, name: 'Smart Watch', price: 199.99, color: '#8b5cf6', icon: 'watch' },
  { id: 3, name: 'Laptop Stand', price: "49.99", color: '#10b981', icon: 'stand' }, // BUG: price is a string!
  { id: 4, name: 'USB-C Hub', price: 34.99, color: '#f59e0b', icon: 'hub' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, color: '#ef4444', icon: 'keyboard' },
];

// BUG: This calculation fails when a price is a string
// Adding a number to a string results in string concatenation, then further operations produce NaN
function calculateTotal(cart) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return Number(total).toFixed(2);
}

// Routes
app.get('/', (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  res.render('index', {
    products,
    cart: req.session.cart,
    total: calculateTotal(req.session.cart)
  });
});

// Add to cart
app.post('/cart/add', (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(p => p.id === productId);

  if (product) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({
      ...product,
      cartId: Date.now()
    });
  }

  res.redirect('/');
});

// Remove from cart
app.post('/cart/remove', (req, res) => {
  const cartId = parseInt(req.body.cartId);

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.cartId !== cartId);
  }

  res.redirect('/');
});

// Clear cart
app.post('/cart/clear', (req, res) => {
  req.session.cart = [];
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
