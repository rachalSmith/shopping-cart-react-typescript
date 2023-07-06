import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

import NavButton from "../../common/navButton.tx/NavButton";
import { pages } from "../helpers";
import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";

interface INavBarProps {
  title: string;
  toggleMobileDrawer: (value: boolean) => void;
}

const NavBar = ({ title, toggleMobileDrawer }: INavBarProps) => {
  const { setIsCartOpen, cartState } = useShoppingCart();

  return (
    <>
      <AppBar
        component='nav'
        elevation={2}
        sx={{
          alignItems: "center",
          height: 56,
        }}
      >
        <Container sx={{ display: "flex" }}>
          <Toolbar
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              aria-label='open drawer'
              edge='start'
              onClick={(prev) => toggleMobileDrawer(!prev)}
              sx={{ mr: 1, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <NavButton
                variant='contained'
                disableElevation
                title={"Men"}
                link={"/shop/men"}
              />
              <NavButton
                variant='contained'
                disableElevation
                title={"Women"}
                link={"/shop/women"}
              />
            </Box>

            <Typography
              variant='h6'
              component='div'
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              {pages.map((page) => (
                <NavButton
                  variant='contained'
                  disableElevation
                  key={page.title}
                  title={page.title}
                  link={page.link}
                />
              ))}
            </Box>
          </Toolbar>
          <IconButton
            aria-label='go to shopping cart'
            component='label'
            sx={{ position: "relative", mr: 2 }}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBagIcon
              color='inherit'
              sx={{
                transform: "scale(1.2)",
                color: cartState.totalItems >= 1 ? "white" : undefined,
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "1.75rem",
                left: cartState.totalItems < 10 ? "1.05rem" : "0.83rem",
                fontWeight: 700,
              }}
              variant='caption'
            >
              {cartState.totalItems >= 1 && cartState.totalItems}
            </Typography>
          </IconButton>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
