import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../../utils/formatCurrency";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";

interface ICardContentProps {
  title: string;
  price: number;
  id: number;
}

const ShoppingCardCardContent = ({ title, price, id }: ICardContentProps) => {
  const {
    onDecrementtCart,
    onIncrementCart,
    onRemoveItem,
    getItemQuantity,
    cartItem,
  } = useShoppingCart();
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
          <Typography>{getItemQuantity(cartItem, id)}</Typography>
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

export default ShoppingCardCardContent;
