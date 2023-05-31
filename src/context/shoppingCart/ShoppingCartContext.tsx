import { useContext, createContext, ReactNode, useState, useMemo } from "react";
import { ICartItemRef } from "../../../types/shoppingCart";

import UseShopItems from "../../hooks/useShopItems";

import {
  decrementCart,
  getItemQuantity,
  incrementCart,
  removeItem,
} from "./shoppingCartHelpers";

import { IShopItem } from "../../../types/shopItem";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  setIsCartOpen: (value: boolean) => void;
  getItemQuantity: (cartItemsRef: ICartItemRef[], id: number) => number;
  onIncrementCart: (id: number) => void;
  onDecrementtCart: (id: number) => void;
  onRemoveItem: (id: number) => void;
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
    return shopItems.filter((shopItem) =>
      cartItemsRef.find((cartItem) => cartItem.id === shopItem.id)
    );
  }, [cartItemsRef, shopItems]);

  const cartQuantity = cartItemsRef.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const onIncrementCart = (id: number) => {
    return setCartItemsRef((cartItemsRef) => incrementCart(cartItemsRef, id));
  };
  const onDecrementtCart = (id: number) => {
    return setCartItemsRef((cartItemsRef) => decrementCart(cartItemsRef, id));
  };
  const onRemoveItem = (id: number) => {
    return setCartItemsRef((cartItemsRef) => removeItem(cartItemsRef, id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        setIsCartOpen,
        getItemQuantity,
        onIncrementCart,
        onDecrementtCart,
        onRemoveItem,
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
