import { useContext, createContext, ReactNode, useState } from "react";
import { ICartItem } from "../../types/shoppingCart";

export const checkCartForItem = (cartItems: ICartItem[], id: number) => {
  return cartItems.find((item) => item.id === id);
};

export const getItemQuantity = (cartItems: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItems, id);

  if (cartItem) {
    return cartItem.quantity;
  }

  return 0;
};

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  getItemQuantity: (cartItems: ICartItem[], id: number) => number;
  incrementCart: (id: number) => void;
  decrementtCart: (id: number) => void;
  removeItem: (id: number) => void;
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: IShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const incrementCart = (id: number) => {};
  const decrementtCart = (id: number) => {};
  const removeItem = (id: number) => {};

  return (
    <ShoppingCartContext.Provider
      value={{ getItemQuantity, incrementCart, decrementtCart, removeItem }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
