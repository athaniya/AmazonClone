export function calculateCartTotals(cartFood,foodQuantity) {
    const taxRate = 0.1;
    const subTotal = cartFood.reduce((acc, food) => acc + food.price * foodQuantity[`${food.id}`], 0);
    const shipping = subTotal > 0 ? 10 : 0;
    const tax = subTotal * taxRate;
    const total = subTotal + shipping + tax;

    return {subTotal,shipping,tax,total}
}