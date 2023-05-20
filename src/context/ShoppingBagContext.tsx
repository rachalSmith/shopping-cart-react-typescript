import { useContext, createContext, ReactNode } from "react";

interface IShoppingBagProvider {
  children: ReactNode;
}

const ShoppingBagContext = createContext({});

export const useShoppingBag = () => {
  return useContext(ShoppingBagContext);
};

export const ShoppingBagProvider = ({ children }: IShoppingBagProvider) => {
  return (
    <ShoppingBagContext.Provider value={{}}>
      {children}
    </ShoppingBagContext.Provider>
  );
};
