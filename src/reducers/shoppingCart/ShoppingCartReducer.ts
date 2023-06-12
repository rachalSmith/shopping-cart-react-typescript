import { IShopItem } from "./../../../types/shopItem";
import produce from "immer";

import { ICartItem } from "../../../types/shoppingCart";

const checkCartForItem = (cartItems: ICartItem[], id: number) => {
  return cartItems.find((item) => item.id === id);
};

export type CartActions =
  | { type: "INCREASE_CART"; payload: IShopItem }
  | { type: "DECREASE_CART"; payload: IShopItem }
  | { type: "REMOVE_FROM_CART"; payload: IShopItem };

export interface ICartState {
  cartItems: ICartItem[];
  totalItems: number;
  totalCost: number;
}

export const cartReducer = (
  state: ICartState,
  action: CartActions
): ICartState => {
  return produce(state, (draft: ICartState) => {
    const { type, payload } = action;

    switch (type) {
      case "INCREASE_CART":
        const existingItem = checkCartForItem(draft.cartItems, payload.id);

        if (existingItem) {
          existingItem.quantity += 1;
        }
        if (!existingItem) {
          draft.cartItems.push({ ...payload, quantity: 1 });
        }
        draft.totalItems += 1;
        draft.totalCost += payload.price;
        break;
      case "DECREASE_CART":
        const itemToDecrease = checkCartForItem(draft.cartItems, payload.id);

        if (itemToDecrease) {
          itemToDecrease.quantity -= 1;
          if (itemToDecrease.quantity === 0) {
            draft.cartItems = draft.cartItems.filter(
              (item) => item.id !== payload.id
            );
          }
          draft.totalItems -= 1;
          draft.totalCost -= payload.price;
        }
        break;
      case "REMOVE_FROM_CART":
        const itemToRemove = checkCartForItem(draft.cartItems, payload.id);

        if (itemToRemove) {
          draft.cartItems = draft.cartItems.filter(
            (item) => item.id !== payload.id
          );
          draft.totalItems -= itemToRemove.quantity;
          draft.totalCost -= itemToRemove.quantity * itemToRemove.price;
        }
        break;
      default:
        throw new Error("unknown action in Shopping Cart Reducer");
    }
  });
};
