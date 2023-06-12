import NavButton from "../../common/navButton.tx/NavButton";
import { pages } from "../helpers";
import { useShoppingCart } from "../../../context/shoppingCart/ShoppingCartContext";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  MenuIcon,
  ShoppingCartOutlinedIcon,
  Toolbar,
  Typography,
} from "../../../mui";

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
              <NavButton title={"Men"} link={"/shop/men"} />
              <NavButton title={"Women"} link={"/shop/women"} />
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
              {cartState.totalItems}
            </Typography>
          </IconButton>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
