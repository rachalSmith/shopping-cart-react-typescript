import Stack from "@mui/material/Stack";
import Drawer from "../../common/drawer/Drawer";
import Card from "../../common/card/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";
import ShoppingCardCardContent from "../shoppingCartCardContent.tsx/ShoppingCartCardContent";

import { formatCurrency } from "../../../utils/formatCurrency";

const ShoppingCartContainer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItem,
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
        responsiveDisplay={{ xs: "block", sm: "block" }}
      >
        <Stack spacing={2} sx={{ mb: 19 }}>
          {cartItem.map((item) => (
            <Card key={item.id} item={item} orientation='row'>
              <ShoppingCardCardContent
                title={item.title}
                price={item.price}
                id={item.id}
              />
            </Card>
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
        </Paper>
      </Drawer>
    </>
  );
};

export default ShoppingCartContainer;
