// BUG: This calculation fails when a price is a string
// Adding a number to a string results in string concatenation, then further operations produce NaN
export function calculateTotal(cart) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return Number(total).toFixed(2);
}
