import { useState } from 'react'

// Mock product images as inline SVG data URIs
const mockImages = {
  headphones: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect fill="#6366f1" width="150" height="150"/><circle cx="75" cy="60" r="35" fill="none" stroke="#fff" stroke-width="6"/><rect x="30" y="55" width="20" height="40" rx="5" fill="#fff"/><rect x="100" y="55" width="20" height="40" rx="5" fill="#fff"/><text x="75" y="120" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Headphones</text></svg>`)}`,
  watch: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect fill="#8b5cf6" width="150" height="150"/><rect x="50" y="30" width="50" height="90" rx="10" fill="#fff"/><circle cx="75" cy="75" r="20" fill="none" stroke="#8b5cf6" stroke-width="3"/><line x1="75" y1="75" x2="75" y2="60" stroke="#8b5cf6" stroke-width="2"/><line x1="75" y1="75" x2="85" y2="75" stroke="#8b5cf6" stroke-width="2"/><text x="75" y="140" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Smart Watch</text></svg>`)}`,
  stand: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect fill="#10b981" width="150" height="150"/><rect x="25" y="40" width="100" height="60" rx="5" fill="#fff" transform="rotate(-10 75 70)"/><rect x="60" y="95" width="30" height="25" fill="#fff"/><rect x="45" y="115" width="60" height="8" rx="2" fill="#fff"/><text x="75" y="140" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Laptop Stand</text></svg>`)}`,
  usbHub: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect fill="#f59e0b" width="150" height="150"/><rect x="30" y="55" width="90" height="40" rx="8" fill="#fff"/><rect x="40" y="65" width="15" height="20" rx="2" fill="#f59e0b"/><rect x="60" y="65" width="15" height="20" rx="2" fill="#f59e0b"/><rect x="80" y="65" width="15" height="20" rx="2" fill="#f59e0b"/><rect x="100" y="65" width="15" height="20" rx="2" fill="#f59e0b"/><text x="75" y="120" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">USB-C Hub</text></svg>`)}`,
  keyboard: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect fill="#ef4444" width="150" height="150"/><rect x="20" y="50" width="110" height="50" rx="5" fill="#fff"/><g fill="#ef4444"><rect x="28" y="58" width="10" height="10" rx="2"/><rect x="42" y="58" width="10" height="10" rx="2"/><rect x="56" y="58" width="10" height="10" rx="2"/><rect x="70" y="58" width="10" height="10" rx="2"/><rect x="84" y="58" width="10" height="10" rx="2"/><rect x="98" y="58" width="10" height="10" rx="2"/><rect x="112" y="58" width="10" height="10" rx="2"/><rect x="28" y="72" width="10" height="10" rx="2"/><rect x="42" y="72" width="10" height="10" rx="2"/><rect x="56" y="72" width="10" height="10" rx="2"/><rect x="70" y="72" width="10" height="10" rx="2"/><rect x="84" y="72" width="10" height="10" rx="2"/><rect x="98" y="72" width="10" height="10" rx="2"/><rect x="112" y="72" width="10" height="10" rx="2"/><rect x="35" y="86" width="80" height="8" rx="2"/></g><text x="75" y="120" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Keyboard</text></svg>`)}`,
}

// Product catalog - note that one product has a string price (BUG!)
const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: mockImages.headphones },
  { id: 2, name: 'Smart Watch', price: 199.99, image: mockImages.watch },
  { id: 3, name: 'Laptop Stand', price: "49.99", image: mockImages.stand }, // BUG: price is a string!
  { id: 4, name: 'USB-C Hub', price: 34.99, image: mockImages.usbHub },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: mockImages.keyboard },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }])
  }

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  // BUG: This calculation fails when a price is a string
  // Adding a number to a string results in string concatenation, then further operations produce NaN
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ShopCart</h1>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="bg-white text-indigo-600 rounded-full px-2 py-1 text-sm font-bold">
              {cart.length}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover bg-gray-200"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-indigo-600 font-bold text-xl mt-2">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 mt-4">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.cartId} className="flex items-center gap-4 border-b pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-indigo-600 font-bold">${item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Total */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium text-gray-600">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ${Number(calculateTotal()).toFixed(2)}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-bold text-lg">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Buggy E-commerce - Demo Shopping Cart</p>
        </div>
      </footer>
    </div>
  )
}

export default App
