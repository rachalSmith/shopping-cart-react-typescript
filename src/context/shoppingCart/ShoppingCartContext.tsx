import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useReducer,
  Dispatch,
} from "react";

import {
  CartActions,
  ICartState,
  cartReducer,
} from "../../reducers/shoppingCart/ShoppingCartReducer";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  cartState: ICartState;
  cartDispatch: Dispatch<CartActions>;
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: IShoppingCartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const initialCartState: ICartState = {
    cartItems: [],
    totalItems: 0,
    totalCost: 0,
  };

  const [cartState, cartDispatch] = useReducer<
    React.Reducer<ICartState, CartActions>
  >(cartReducer, initialCartState);

  return (
    <ShoppingCartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartState,
        cartDispatch,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
