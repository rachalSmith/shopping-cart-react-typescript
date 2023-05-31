import Stack from "@mui/material/Stack";
import Drawer from "../../common/drawer/Drawer";
import Card from "../../common/card/Card";

import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";
import ShoppingCardCardContent from "../shoppingCartCardContent.tsx/ShoppingCartCardContent";

const ShoppingCartContainer = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useShoppingCart();

  return (
    <>
      <Drawer
        anchor={"right"}
        title={"Cart"}
        isOpen={isCartOpen}
        setIsDrawerOpen={setIsCartOpen}
        width={"100%"}
      >
        <Stack spacing={2}>
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
      </Drawer>
    </>
  );
};

export default ShoppingCartContainer;
