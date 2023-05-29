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

export const incrementCart = (cartItems: ICartItem[], id: number) => {
  const cartItem = checkCartForItem(cartItems, id);
  const incrementedCart: ICartItem[] = [];

  if (!cartItem) {
    return [...cartItems, { id, quantity: 1 }];
  }

  cartItems.forEach((item) => {
    if (item.id === id) {
      incrementedCart.push({ ...item, quantity: item.quantity + 1 });
    }
    if (item.id !== id) {
      incrementedCart.push(item);
    }
  });

  return incrementedCart;
};

export const decrementCart = (cartItems: ICartItem[], id: number) => {
  const incrementedCart: ICartItem[] = [];

  cartItems.forEach((item) => {
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
export const removeItem = (cartItems: ICartItem[], id: number) => {
  return cartItems.filter((item) => item.id !== id);
};

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  setIsCartOpen: (value: boolean) => void;
  getItemQuantity: (cartItems: ICartItem[], id: number) => number;
  onIncrementCart: (id: number) => void;
  onDecrementtCart: (id: number) => void;
  onRemoveItem: (id: number) => void;
  isCartOpen: boolean;
  cartQuantity: number;
  cartItems: ICartItem[];
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: IShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const onIncrementCart = (id: number) => {
    return setCartItems((cartItems) => incrementCart(cartItems, id));
  };
  const onDecrementtCart = (id: number) => {
    return setCartItems((cartItems) => incrementCart(cartItems, id));
  };
  const onRemoveItem = (id: number) => {
    return setCartItems((cartItems) => incrementCart(cartItems, id));
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
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
