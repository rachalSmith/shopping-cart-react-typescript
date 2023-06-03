import { useContext, createContext, ReactNode, useState, useMemo } from "react";

import UseShopItems from "../../hooks/useShopItems";

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
import { ICartItemRef } from "../../../types/shoppingCart";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  setIsCartOpen: (value: boolean) => void;
  getItemQuantity: (cartItemsRef: ICartItemRef[], id: number) => number;
  onIncrementCart: (id: number) => void;
  onDecrementtCart: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onCalculateTotalCost: () => number;
  isCartOpen: boolean;
  cartQuantity: number;
  cartItemsRef: ICartItemRef[];
  cartItems: IShopItem[];
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: IShoppingCartProviderProps) => {
  const [cartItemsRef, setCartItemsRef] = useState<ICartItemRef[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { shopItems } = UseShopItems();

  const cartItems = useMemo(() => {
    return getCartItems(shopItems, cartItemsRef);
  }, [cartItemsRef, shopItems]);

  const cartQuantity = getCartQuantity(cartItemsRef);

  const onIncrementCart = (id: number) => {
    return setCartItemsRef((cartItemsRef) => incrementCart(cartItemsRef, id));
  };
  const onDecrementtCart = (id: number) => {
    return setCartItemsRef((cartItemsRef) => decrementCart(cartItemsRef, id));
  };
  const onRemoveItem = (id: number) => {
    return setCartItemsRef((cartItemsRef) => removeItem(cartItemsRef, id));
  };

  const onCalculateTotalCost = () => {
    return getTotalCost(cartItemsRef, shopItems);
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
        cartItemsRef,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
