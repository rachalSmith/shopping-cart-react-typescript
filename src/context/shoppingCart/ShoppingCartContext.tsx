import { useContext, createContext, ReactNode, useState, useMemo } from "react";

import {
  decrementCart,
  getCartItems,
  getCartQuantity,
  getItemQuantity,
  getTotalCost,
  incrementCart,
  removeItem,
} from "./shoppingCartHelpers";

import { IShopItem } from "../../../types/shopItem";
import { ICartItem } from "../../../types/shoppingCart";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  setIsCartOpen: (value: boolean) => void;
  getItemQuantity: (cartItemsRef: ICartItem[], id: number) => number;
  onIncrementCart: (id: number) => void;
  onDecrementtCart: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onCalculateTotalCost: () => number;
  isCartOpen: boolean;
  cartQuantity: number;
  cartItemsRef: ICartItem[];
  cartItems: IShopItem[];
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: IShoppingCartProviderProps) => {
  const [cartItem, setCartItem] = useState<ICartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const cartItems = useMemo(() => {
    return getCartItems(shopItems, cartItem);
  }, [cartItem, shopItems]);

  const cartQuantity = getCartQuantity(cartItem);

  const onIncrementCart = (id: number) => {
    return setCartItem((cartItem) => incrementCart(cartItem, id));
  };
  const onDecrementtCart = (id: number) => {
    return setCartItem((cartItem) => decrementCart(cartItem, id));
  };
  const onRemoveItem = (id: number) => {
    return setCartItem((cartItem) => removeItem(cartItem, id));
  };

  const onCalculateTotalCost = () => {
    return getTotalCost(cartItem, shopItems);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        setIsCartOpen,
        getItemQuantity,
        onIncrementCart,
        onDecrementtCart,
        onRemoveItem,
        onCalculateTotalCost,
        isCartOpen,
        cartItem,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

  return (
    <ShoppingCartContext.Provider
      value={{
        setIsCartOpen,
        getItemQuantity,
        onIncrementCart,
        onDecrementtCart,
        onRemoveItem,
        onCalculateTotalCost,
        isCartOpen,
        cartQuantity,
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
