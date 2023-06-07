import { useState } from "react";

import Drawer from "../../common/drawer/Drawer";
import NavBar from "../navBar/NavBar";
import MobileNav from "../mobileNav/MobileNav";

const title = "Name";

const NavContainer = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar
        title={title}
        toggleMobileDrawer={(prev) => setIsMobileDrawerOpen(!prev)}
      />
      <Drawer
        anchor={"left"}
        title={title}
        isOpen={isMobileDrawerOpen}
        setIsDrawerOpen={setIsMobileDrawerOpen}
        width={"240px"}
        responsiveDisplay={{ xs: "block", sm: "none" }}
      >
        <MobileNav />
      </Drawer>
    </>
  );
};

export default NavContainer;
