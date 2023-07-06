import Stack from "@mui/material/Stack";
import Drawer from "../../common/drawer/Drawer";
import Card from "../../common/card/Card";

import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";
import ShoppingCardCardContent from "../shoppingCartCardContent.tsx/ShoppingCartCardContent";

import { formatCurrency } from "../../../utils/formatCurrency";
import { Divider, Fab, Grid, Paper, Typography } from "@mui/material";

const ShoppingCartContainer = () => {
  const { isCartOpen, setIsCartOpen, cartState } = useShoppingCart();

  const { cartItems, totalItems, totalCost } = cartState;

  return (
    <>
      <Drawer
        anchor={"right"}
        title={"Cart"}
        isOpen={isCartOpen}
        setIsDrawerOpen={setIsCartOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: 400,
          },
        }}
      >
        <Stack spacing={2} sx={{ mb: 16 }}>
          {cartItems.map((item) => (
            <>
              <Card key={item.id} item={item} orientation='row' elevation={0}>
                <ShoppingCardCardContent item={item} />
                <Divider />
              </Card>
            </>
          ))}
        </Stack>
        <Paper
          elevation={0}
          sx={{
            pt: 2,
            position: "fixed",
            bottom: 0,
            width: "400px",
            borderRadius: "0px",
          }}
        >
          <Divider variant='middle' />
          <Grid
            container
            spacing={2}
            justifyContent='space-between'
            sx={{ p: 3 }}
          >
            <Grid item>
              <Typography variant='body2'>
                Subtotal ({totalItems} Item{totalItems > 1 && "s"})
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {formatCurrency(totalCost)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Fab sx={{ width: "100%" }} variant='extended'>
                Checkout
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Drawer>
    </>
  );
};

export default ShoppingCartContainer;
