import { IShopItem } from "../../../types/shopItem";
import { ICartItemRef } from "../../../types/shoppingCart";

export const checkCartForItem = (cartItemsRef: ICartItemRef[], id: number) => {
  return cartItemsRef.find((item) => item.id === id);
};

export const getCartItems = (
  shopItems: IShopItem[],
  cartItemsRef: ICartItemRef[]
) => {
  return shopItems.filter((shopItem) =>
    checkCartForItem(cartItemsRef, shopItem.id)
  );
};

export const getCartQuantity = (cartItemsRef: ICartItemRef[]) => {
  return cartItemsRef.reduce((quantity, item) => item.quantity + quantity, 0);
};

export const getItemQuantity = (cartItemsRef: ICartItemRef[], id: number) => {
  const cartItem = checkCartForItem(cartItemsRef, id);

  if (cartItem) {
    return cartItem.quantity;
  }

  return 0;
};

export const incrementCart = (cartItemsRef: ICartItemRef[], id: number) => {
  const cartItem = checkCartForItem(cartItemsRef, id);
  const incrementedCart: ICartItemRef[] = [];

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

export const decrementCart = (cartItemsRef: ICartItemRef[], id: number) => {
  const incrementedCart: ICartItemRef[] = [];

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
export const removeItem = (cartItemsRef: ICartItemRef[], id: number) => {
  return cartItemsRef.filter((item) => item.id !== id);
};
