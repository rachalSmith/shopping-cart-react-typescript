import { useState } from "react";

import Drawer from "../../common/drawer/Drawer";
import NavBar from "../navBar/NavBar";
import MobileNav from "../mobileNav/MobileNav";

import { itemCategory } from "../../../../types/shopItem";

const title = "Name";

const NavContainer = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<itemCategory>("women's clothing");

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
    </>
  );
};

export default NavContainer;
