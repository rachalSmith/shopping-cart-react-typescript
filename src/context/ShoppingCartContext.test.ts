import { ICartItem } from "../../types/shoppingCart";
import { checkCartForItem, getItemQuantity } from "./ShoppingCartContext";

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
