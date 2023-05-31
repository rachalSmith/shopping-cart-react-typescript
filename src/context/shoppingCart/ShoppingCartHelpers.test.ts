import { ICartItem } from "../../../types/shoppingCart";
import {
  checkCartForItem,
  getItemQuantity,
  incrementCart,
  decrementCart,
  removeItem,
} from "./shoppingCartHelpers";

describe("checkCartForItem", () => {
  const cartItems: ICartItem[] = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 5 },
  ];

  it("should return the matching item when it exists in the cart", () => {
    const itemId = 2;
    const result = checkCartForItem(cartItems, itemId);
    expect(result).toEqual({ id: 2, quantity: 1 });
  });
  it("should return undefined when the item does not exist in the cart", () => {
    const itemId = 4;
    const result = checkCartForItem(cartItems, itemId);
    expect(result).toBeUndefined();
  });
});

describe("getItemQuantity", () => {
  const cartItems: ICartItem[] = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 5 },
  ];

  it("should return the quantity of the matching item when it exists in the cart", () => {
    const itemId = 2;
    const result = getItemQuantity(cartItems, itemId);
    expect(result).toBe(1);
  });
  it("should return 0 when the item does not exist in the cart", () => {
    const itemId = 4;
    const result = getItemQuantity(cartItems, itemId);
    expect(result).toBe(0);
  });
});

describe("incrementCart", () => {
  const initialCartItems: ICartItem[] = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 5 },
  ];

  it("should increment the quantity of an existing item in the cart", () => {
    const id = 2;
    const result = incrementCart(initialCartItems, id);

    expect(result).toEqual([
      { id: 1, quantity: 3 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 5 },
    ]);
  });

  it("should add a new item to the cart when it does not exist", () => {
    const id = 4;
    const result = incrementCart(initialCartItems, id);

    expect(result).toEqual([
      { id: 1, quantity: 3 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 5 },
      { id: 4, quantity: 1 },
    ]);
  });
});

describe("decrementCart", () => {
  const initialCartItems: ICartItem[] = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 5 },
  ];

  it("should decrement the quantity of an existing item in the cart", () => {
    const id = 1;
    const result = decrementCart(initialCartItems, id);

    expect(result).toEqual([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 5 },
    ]);
  });
  it("should remove the item from the cart if the quantity becomes 0", () => {
    const id = 2;
    const result = decrementCart(initialCartItems, id);

    expect(result).toEqual([
      { id: 1, quantity: 3 },
      { id: 3, quantity: 5 },
    ]);
  });
});

describe("removeItem", () => {
  const initialCartItems: ICartItem[] = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 5 },
  ];

  it("should remove the item from the cart", () => {
    const id = 2;
    const result = removeItem(initialCartItems, id);

    expect(result).toEqual([
      { id: 1, quantity: 3 },
      { id: 3, quantity: 5 },
    ]);
  });
});
