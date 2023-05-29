import { useState } from "react";

import Drawer from "../../common/drawer/Drawer";
import NavBar from "../navBar/NavBar";
import MobileNav from "../mobileNav/MobileNav";

import { itemCategory } from "../../../../types/shopItem";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import Card from "../../common/card/Card";
import Stack from "@mui/material/Stack";

const title = "Name";

const NavContainer = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<itemCategory>("women's clothing");

  const { isCartOpen, setIsCartOpen, cartItems } = useShoppingCart();

  return (
    <>
      <NavBar
        title={title}
        toggleMobileDrawer={(prev) => setIsMobileDrawerOpen(!prev)}
        setQuery={setQuery}
      />
      <Drawer
        anchor={"left"}
        title={title}
        isOpen={isMobileDrawerOpen}
        setIsDrawerOpen={setIsMobileDrawerOpen}
        width={"240px"}
      >
        <MobileNav setQuery={setQuery} />
      </Drawer>
      <Drawer
        anchor={"right"}
        title={title}
        isOpen={isCartOpen}
        setIsDrawerOpen={setIsCartOpen}
        width={"240px"}
      >
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <div style={{ border: "red solid" }}>{item.id}</div>

            // <Card
            //key={item.id}
            //   item={item}
            //   orientation='column'
            //   quickAddButton={<QuickAddButton id={item.id} />}
            // >
            //   <CardContent title={item.title} price={item.price} />
            // </Card>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default NavContainer;
