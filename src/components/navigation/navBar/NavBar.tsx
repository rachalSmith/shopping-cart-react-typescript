import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import { itemCategory } from "../../../../types/shopItem";
import NavButton from "../../common/navButton.tx/NavButton";
import { pages } from "../helpers";
import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";

interface INavBarProps {
  title: string;
  toggleMobileDrawer: (value: boolean) => void;
  setQuery: (value: itemCategory) => void;
}

const NavBar = ({ title, toggleMobileDrawer, setQuery }: INavBarProps) => {
  const { setIsCartOpen, cartQuantity } = useShoppingCart();

  return (
    <>
      <AppBar
        component='nav'
        elevation={2}
        sx={{
          alignItems: "center",
          background: "white",
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
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <NavButton
                title={"Men"}
                link={"/shop"}
                setQuery={() => setQuery("men's clothing")}
              />
              <NavButton
                title={"Women"}
                link={"/shop"}
                setQuery={() => setQuery("women's clothing")}
              />
            </Box>

            <Typography
              variant='h6'
              component='div'
              sx={{ color: "gray", display: { xs: "none", sm: "block" } }}
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
                  key={page.title}
                  title={page.title}
                  link={page.link}
                />
              ))}
            </Box>
          </Toolbar>
          <IconButton
            onClick={() => setIsCartOpen(true)}
            aria-label='go to shopping cart'
            component='label'
            sx={{ position: "relative", mr: 2 }}
          >
            <ShoppingCartOutlinedIcon sx={{ transform: "scale(1.2)" }} />
            <Typography
              sx={{
                background: "red",
                position: "absolute",
                color: "#fff",
                top: "1.5rem",
                left: "1.25rem",
                borderRadius: "50%",
                width: "1rem",
                height: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant='caption'
            >
              {cartQuantity}
            </Typography>
          </IconButton>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
