import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../../utils/formatCurrency";

import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";

import { ICartItem } from "../../../../types/shoppingCart";
import {
  AddIcon,
  Box,
  CloseIcon,
  Grid,
  IconButton,
  RemoveIcon,
} from "../../../mui";

interface ICardContentProps {
  item: ICartItem;
}

const ShoppingCardCardContent = ({ item }: ICardContentProps) => {
  const { cartDispatch } = useShoppingCart();

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='caption'>{item.title}</Typography>

        <IconButton
          sx={{
            p: 0,
          }}
          aria-label='close'
          onClick={() =>
            cartDispatch({ type: "REMOVE_FROM_CART", payload: item })
          }
        >
          <CloseIcon sx={{ transform: "scale(0.8)" }} />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='subtitle2'>
          {formatCurrency(item.price)}
        </Typography>
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
              cartDispatch({ type: "DECREASE_CART", payload: item });
            }}
          >
            <RemoveIcon sx={{ transform: "scale(0.8)" }} />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            onClick={() => {
              cartDispatch({ type: "INCREASE_CART", payload: item });
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

export default ShoppingCardCardContent;
