import { IShopItem } from "../../../types/shopItem";
import { ICartItem } from "../../../types/shoppingCart";
export const checkCartForItem = (cartItemsRef: ICartItem[], id: number) => {
  return cartItemsRef.find((item) => item.id === id);
};

export const getTotalCost = (
  cartItemsRef: ICartItem[],
  shopItems: IShopItem[]
) => {
  return cartItemsRef.reduce(
    (acc, { id, quantity }) =>
      acc +
      quantity * (shopItems.find((shopItem) => shopItem.id === id)?.price || 0),
    0
  );
};

export const getCartItems = (
  shopItems: IShopItem[],
  cartItemsRef: ICartItem[]
) => {
  return shopItems.filter((shopItem) =>
    checkCartForItem(cartItemsRef, shopItem.id)
  );
};

export const getCartQuantity = (cartItemsRef: ICartItem[]) => {
  return cartItemsRef.reduce((quantity, item) => item.quantity + quantity, 0);
};

export const getItemQuantity = (cartItemsRef: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItemsRef, id);

  if (cartItem) {
    return cartItem.quantity;
  }

  return 0;
};

export const incrementCart = (cartItemsRef: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItemsRef, id);
  const incrementedCart: ICartItem[] = [];

  if (!cartItem) {
    return [...cartItemsRef, { id, quantity: 1 }];
  }

  cartItemsRef.forEach((item) => {
    if (item.id === id) {
      incrementedCart.push({ ...item, quantity: item.quantity + 1 });
    }
    if (item.id !== id) {
      incrementedCart.push(item);
    }
  });

  return incrementedCart;
};

export const decrementCart = (cartItemsRef: ICartItem[], id: number) => {
  const incrementedCart: ICartItem[] = [];

  cartItemsRef.forEach((item) => {
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
export const removeItem = (cartItemsRef: ICartItem[], id: number) => {
  return cartItemsRef.filter((item) => item.id !== id);
};
