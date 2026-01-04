# Buggy E-commerce

A simple shopping cart application built with Express.js and Tailwind CSS that contains an intentional bug for demonstration purposes.

## The Bug

In `server.js:31`, the "Laptop Stand" product has its price as a **string** instead of a number:

```javascript
{ id: 3, name: 'Laptop Stand', price: "49.99", ... } // BUG: price is a string!
```

When calculating the total, adding a number to a string causes string concatenation, resulting in **NaN** being displayed.

## Setup

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## To Reproduce the Bug

1. Add "Wireless Headphones" ($79.99) to cart - total shows correctly
2. Add "Laptop Stand" ($49.99) to cart - **total shows $NaN**

## Tech Stack

- Express.js
- EJS templating
- Tailwind CSS (CDN)
- express-session for cart storage
