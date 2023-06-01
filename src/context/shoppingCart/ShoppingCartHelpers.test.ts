import { IShopItem } from "../../../types/shopItem";
import { ICartItemRef } from "../../../types/shoppingCart";
import {
  checkCartForItem,
  getItemQuantity,
  incrementCart,
  decrementCart,
  removeItem,
  getCartItems,
  getCartQuantity,
  getTotalCost,
} from "./shoppingCartHelpers";

const cartItemsRef: ICartItemRef[] = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
  { id: 3, quantity: 5 },
];

const shopItem1: IShopItem = {
  id: 1,
  category: "men's clothing",
  description: "description",
  image: "image",
  price: 10,
  rating: { rating: 5, count: 10 },
  title: "item",
};

const shopItem2: IShopItem = {
  ...shopItem1,
  id: 2,
  category: "women's clothing",
  price: 20,
};

const shopItem3: IShopItem = {
  ...shopItem1,
  id: 3,
  category: "women's clothing",
};

const shopItem4: IShopItem = {
  ...shopItem1,
  id: 4,
  price: 5,
};

const shopItem5: IShopItem = {
  ...shopItem1,
  id: 5,
  price: 20,
};

const shopItems: IShopItem[] = [
  shopItem1,
  shopItem2,
  shopItem3,
  shopItem4,
  shopItem5,
];

describe("getTotalCost", () => {
  it("should return 0 when both cartItemsRef and shopItems are empty", () => {
    const result = getTotalCost([], []);

    expect(result).toStrictEqual(0);
  });

  it("should return the correct total cost when cartItemsRef and shopItems have matching items", () => {
    const result = getTotalCost(cartItemsRef, shopItems);

    expect(result).toStrictEqual(100); // 3*10 + 1*20 + 5*10 = 100
  });

  it("should return the correct total cost when cartItemsRef has duplicate items", () => {
    const duplicateCartItems: ICartItemRef[] = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 1, quantity: 1 },
    ];
    const result = getTotalCost(duplicateCartItems, shopItems);

    expect(result).toStrictEqual(50); // 2*10 + 1*20 + 1*10 = 50
  });

  it("should return 0 when cartItemsRef contains invalid item IDs", () => {
    const invalidCartItemsRef: ICartItemRef[] = [
      { id: 7, quantity: 2 },
      { id: 8, quantity: 1 },
    ];
    const result = getTotalCost(invalidCartItemsRef, shopItems);

    expect(result).toStrictEqual(0);
  });
});

describe("getCartQuantity", () => {
  it("should return 0 when cartItemsRef is empty", () => {
    const cartItemsRef: ICartItemRef[] = [];
    const result = getCartQuantity(cartItemsRef);

    expect(result).toStrictEqual(0);
  });

  it("should return the correct total quantity when cartItemsRef has items", () => {
    const result = getCartQuantity(cartItemsRef);

    expect(result).toStrictEqual(9);
  });
  it("should return the correct total quantity when cartItemsRef has duplicate items", () => {
    const cartItemsRef: ICartItemRef[] = [
      { id: 1, quantity: 3 },
      { id: 2, quantity: 2 },
      { id: 1, quantity: 5 },
    ];
    const result = getCartQuantity(cartItemsRef);

    expect(result).toStrictEqual(10);
  });
});

describe("getCartItems", () => {
  it("should return an empty array when the cartItemsRef is empty", () => {
    const result = getCartItems(shopItems, []);

    expect(result).toStrictEqual([]);
  });
  it("should return only the items that match the cartItemsRef", () => {
    const result = getCartItems(shopItems, cartItemsRef);

    expect(result).toStrictEqual([shopItem1, shopItem2, shopItem3]);
  });
  it("should return only the items that exist in shopItems", () => {
    const invalidCartItemsRef: ICartItemRef[] = [
      { id: 6, quantity: 2 },
      { id: 7, quantity: 1 },
    ];
    const result = getCartItems(shopItems, invalidCartItemsRef);

    expect(result).toStrictEqual([]);
  });
  it("should return an empty array when both shopItems and cartItemsRef are empty", () => {
    const result = getCartItems([], []);

    expect(result).toStrictEqual([]);
  });
});

describe("checkCartForItem", () => {
  it("should return the matching item when it exists in the cart", () => {
    const itemId = 2;
    const result = checkCartForItem(cartItemsRef, itemId);

    expect(result).toStrictEqual({ id: 2, quantity: 1 });
  });
  it("should return undefined when the item does not exist in the cart", () => {
    const itemId = 4;
    const result = checkCartForItem(cartItemsRef, itemId);

    expect(result).toBeUndefined();
  });
});

describe("getItemQuantity", () => {
  it("should return the quantity of the matching item when it exists in the cart", () => {
    const itemId = 2;
    const result = getItemQuantity(cartItemsRef, itemId);

    expect(result).toBe(1);
  });
  it("should return 0 when the item does not exist in the cart", () => {
    const itemId = 4;
    const result = getItemQuantity(cartItemsRef, itemId);

    expect(result).toBe(0);
  });
});

describe("incrementCart", () => {
  it("should increment the quantity of an existing item in the cart", () => {
    const id = 2;
    const result = incrementCart(cartItemsRef, id);

    expect(result).toStrictEqual([
      { id: 1, quantity: 3 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 5 },
    ]);
  });

  it("should add a new item to the cart when it does not exist", () => {
    const id = 4;
    const result = incrementCart(cartItemsRef, id);

    expect(result).toStrictEqual([
      { id: 1, quantity: 3 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 5 },
      { id: 4, quantity: 1 },
    ]);
  });
});

describe("decrementCart", () => {
  it("should decrement the quantity of an existing item in the cart", () => {
    const id = 1;
    const result = decrementCart(cartItemsRef, id);

    expect(result).toStrictEqual([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 5 },
    ]);
  });
  it("should remove the item from the cart if the quantity becomes 0", () => {
    const id = 2;
    const result = decrementCart(cartItemsRef, id);

    expect(result).toStrictEqual([
      { id: 1, quantity: 3 },
      { id: 3, quantity: 5 },
    ]);
  });
});

describe("removeItem", () => {
  it("should remove the item from the cart", () => {
    const id = 2;
    const result = removeItem(cartItemsRef, id);

    expect(result).toStrictEqual([
      { id: 1, quantity: 3 },
      { id: 3, quantity: 5 },
    ]);
  });
});
