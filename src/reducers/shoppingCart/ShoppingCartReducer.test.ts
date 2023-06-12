import { IShopItem } from "../../../types/shopItem";
import { CartActions, ICartState, cartReducer } from "./ShoppingCartReducer";

const shopItemMen: IShopItem = {
  category: "men's clothing",
  description: "Description",
  id: 1,
  image: "https://example.com/image.jpg",
  price: 10,
  rating: {
    rating: 4.5,
    count: 10,
  },
  title: "Men's Shirt",
};

const shopItemWomen: IShopItem = {
  category: "women's clothing",
  description: "Description",
  id: 2,
  image: "https://example.com/image.jpg",
  price: 20,
  rating: {
    rating: 4,
    count: 5,
  },
  title: "Women's Shirt",
};

const emptyCartState: ICartState = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
};

const oneItemTypeCartState: ICartState = {
  cartItems: [{ ...shopItemWomen, quantity: 2 }],
  totalItems: 2,
  totalCost: 40,
};

const multipleCartState: ICartState = {
  cartItems: [
    { ...shopItemWomen, quantity: 1 },
    { ...shopItemMen, quantity: 2 },
  ],
  totalItems: 3,
  totalCost: 40,
};

describe("cartReducer", () => {
  describe("INCREASE_CART", () => {
    it("should add a new item to the cart and increase the total cost when the cart is empty", () => {
      const payload: IShopItem = {
        ...shopItemMen,
      };
      const action: CartActions = {
        type: "INCREASE_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [{ ...payload, quantity: 1 }],
        totalItems: 1,
        totalCost: payload.price,
      };

      const newState = cartReducer(emptyCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });
    it("should add a new item to the cart and increase the total cost when no cart items match its id", () => {
      const payload: IShopItem = {
        ...shopItemMen,
        id: 3,
      };
      const action: CartActions = {
        type: "INCREASE_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [
          ...multipleCartState.cartItems,
          { ...payload, quantity: 1 },
        ],
        totalItems: 4,
        totalCost: multipleCartState.totalCost + payload.price,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });
    it("should increase quantity and total cost when the item already exists in the cart", () => {
      const payload: IShopItem = {
        ...shopItemMen,
      };
      const action: CartActions = {
        type: "INCREASE_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [
          { ...shopItemWomen, quantity: 1 },
          { ...shopItemMen, quantity: 3 },
        ],
        totalItems: 4,
        totalCost: multipleCartState.totalCost + payload.price,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("DECREASE_CART", () => {
    it("should decrease cart items and total cost when the item quantity is more than 1", () => {
      const payload: IShopItem = {
        ...shopItemMen,
      };
      const action: CartActions = {
        type: "DECREASE_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [
          { ...shopItemWomen, quantity: 1 },
          { ...shopItemMen, quantity: 1 },
        ],
        totalItems: 2,
        totalCost: multipleCartState.totalCost - payload.price,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });

    it("should remove the item from the cart and adjust the total cost when the item quantity is 1", () => {
      const payload: IShopItem = {
        ...shopItemWomen,
      };
      const action: CartActions = {
        type: "DECREASE_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [{ ...shopItemMen, quantity: 2 }],
        totalItems: 2,
        totalCost: multipleCartState.totalCost - payload.price,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });

    it("should not adjust the cart if the item id does not match a cart item id", () => {
      const payload: IShopItem = {
        ...shopItemMen,
        id: 4,
      };
      const action: CartActions = {
        type: "DECREASE_CART",
        payload,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(multipleCartState);
    });
  });

  describe("REMOVE_FROM_CART", () => {
    it("should remove the item from the cart and adjust the total cost when the cart only contains that item", () => {
      const payload: IShopItem = {
        ...shopItemWomen,
      };
      const action: CartActions = {
        type: "REMOVE_FROM_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [],
        totalItems: 0,
        totalCost: 0,
      };

      const newState = cartReducer(oneItemTypeCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });

    it("should remove the item from the cart and adjust the total cost when the cart contains other items", () => {
      const payload: IShopItem = {
        ...shopItemMen,
      };
      const action: CartActions = {
        type: "REMOVE_FROM_CART",
        payload,
      };

      const expectedState: ICartState = {
        cartItems: [{ ...shopItemWomen, quantity: 1 }],
        totalItems: 1,
        totalCost: 20,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(expectedState);
    });

    it("should not adjust the cart if the item id does not match a cart item id", () => {
      const payload: IShopItem = {
        ...shopItemMen,
        id: 4,
      };
      const action: CartActions = {
        type: "REMOVE_FROM_CART",
        payload,
      };

      const newState = cartReducer(multipleCartState, action);

      expect(newState).toStrictEqual(multipleCartState);
    });
  });
});
