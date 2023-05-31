import { ICartItem } from "../../../types/shoppingCart";

export const checkCartForItem = (cartItems: ICartItem[], id: number) => {
  return cartItems.find((item) => item.id === id);
};

export const getItemQuantity = (cartItems: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItems, id);

  if (cartItem) {
    return cartItem.quantity;
  }

  return 0;
};

export const incrementCart = (cartItems: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItems, id);
  const incrementedCart: ICartItem[] = [];

  if (!cartItem) {
    return [...cartItems, { id, quantity: 1 }];
  }

  cartItems.forEach((item) => {
    if (item.id === id) {
      incrementedCart.push({ ...item, quantity: item.quantity + 1 });
    }
    if (item.id !== id) {
      incrementedCart.push(item);
    }
  });

  return incrementedCart;
};

export const decrementCart = (cartItems: ICartItem[], id: number) => {
  const incrementedCart: ICartItem[] = [];

  cartItems.forEach((item) => {
    if (item.id === id && item.quantity > 1) {
      incrementedCart.push({ ...item, quantity: item.quantity - 1 });
    }
    if (item.id === id && item.quantity === 1) {
      return;
    }
    if (item.id !== id) {
      incrementedCart.push(item);
    }
  });

  return incrementedCart;
};
export const removeItem = (cartItems: ICartItem[], id: number) => {
  return cartItems.filter((item) => item.id !== id);
};
