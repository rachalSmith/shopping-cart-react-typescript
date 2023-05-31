import { useContext, createContext, ReactNode, useState, useMemo } from "react";
import { ICartItem } from "../../../types/shoppingCart";
import Stack from "@mui/material/Stack";
import Drawer from "../../components/common/drawer/Drawer";
import Card from "../../components/common/card/Card";
import UseShopItems from "../../hooks/useShopItems";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  decrementCart,
  getItemQuantity,
  incrementCart,
  removeItem,
} from "./shoppingCartHelpers";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ICardContentProps {
  title: string;
  price: number;
  quantity: any;
  id: number;
  onRemoveItem: (id: number) => void;
  onIncrementCart: (id: number) => void;
  onDecrementtCart: (id: number) => void;
}

const CardContent = ({
  title,
  price,
  id,
  onRemoveItem,
  quantity,
  onIncrementCart,
  onDecrementtCart,
}: ICardContentProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Typography variant='caption'>{title}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          size='small'
          aria-label='close'
          onClick={() => onRemoveItem(id)}
        >
          <CloseIcon sx={{ transform: "scale(0.8)" }} />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='subtitle2'>{formatCurrency(price)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "90px",
            border: "1px grey solid",
            borderRadius: 50,
            p: 0.25,
          }}
        >
          <IconButton
            size='small'
            sx={{ p: 0 }}
            onClick={() => {
              onDecrementtCart(id);
            }}
          >
            <RemoveIcon sx={{ transform: "scale(0.8)" }} />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton
            onClick={() => {
              onIncrementCart(id);
            }}
            size='small'
            sx={{ p: 0 }}
          >
            <AddIcon sx={{ transform: "scale(0.8)" }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
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
    return setCartItems((cartItems) => decrementCart(cartItems, id));
  };
  const onRemoveItem = (id: number) => {
    return setCartItems((cartItems) => removeItem(cartItems, id));
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
              <CardContent
                title={item.title}
                price={item.price}
                id={item.id}
                onRemoveItem={onRemoveItem}
                onIncrementCart={onIncrementCart}
                onDecrementtCart={onDecrementtCart}
                quantity={getItemQuantity(cartItems, item.id)}
              />
            </Card>
          ))}
        </Stack>
      </Drawer>
    </ShoppingCartContext.Provider>
  );
};
