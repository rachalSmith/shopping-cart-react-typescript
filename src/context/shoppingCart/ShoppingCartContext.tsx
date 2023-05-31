import { useContext, createContext, ReactNode, useState, useMemo } from "react";
import { ICartItem } from "../../../types/shoppingCart";
import Stack from "@mui/material/Stack";
import Drawer from "../../components/common/drawer/Drawer";
import Card from "../../components/common/card/Card";
import UseShopItems from "../../hooks/useShopItems";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/formatCurrency";

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

interface ICardContentProps {
  title: string;
  price: number;
}

const CardContent = ({ title, price }: ICardContentProps) => {
  return (
    <>
      <Typography variant='caption'>{title}</Typography>
      <Typography variant='subtitle2'>{formatCurrency(price)}</Typography>
    </>
  );
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

  const { shopItems } = UseShopItems();

  const items = useMemo(() => {
    return shopItems.filter((shopItem) =>
      cartItems.find((cartItem) => cartItem.id === shopItem.id)
    );
  }, [cartItems, shopItems]);

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
      <Drawer
        anchor={"right"}
        title={"Cart"}
        isOpen={isCartOpen}
        setIsDrawerOpen={setIsCartOpen}
        width={"100%"}
      >
        <Stack spacing={2}>
          {items.map((item) => (
            <Card key={item.id} item={item} orientation='row'>
              <CardContent title={item.title} price={item.price} />
            </Card>
          ))}
        </Stack>
      </Drawer>
    </ShoppingCartContext.Provider>
  );
};
