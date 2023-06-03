import Stack from "@mui/material/Stack";
import Drawer from "../../common/drawer/Drawer";
import Card from "../../common/card/Card";

import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";
import ShoppingCardCardContent from "../shoppingCartCardContent.tsx/ShoppingCartCardContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Fab, Grid, Typography } from "@mui/material";
import { formatCurrency } from "../../../utils/formatCurrency";

const ShoppingCartContainer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartQuantity,
    onCalculateTotalCost,
  } = useShoppingCart();

  return (
    <>
      <Drawer
        anchor={"right"}
        title={"Cart"}
        isOpen={isCartOpen}
        setIsDrawerOpen={setIsCartOpen}
        width={"400px"}
      >
        <Stack spacing={2} sx={{ mb: 10 }}>
          {cartItems.map((item) => (
            <Card key={item.id} item={item} orientation='row'>
              <ShoppingCardCardContent
                title={item.title}
                price={item.price}
                id={item.id}
              />
            </Card>
          ))}
        </Stack>
        <Box
          sx={{
            marginTop: 40,
            position: "fixed",
            bottom: 0,
            width: "400px",
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
                Subtotal ({cartQuantity} Item{cartQuantity > 1 && "s"})
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {formatCurrency(onCalculateTotalCost())}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Fab sx={{ width: "100%" }} variant='extended'>
                Checkout
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default ShoppingCartContainer;
