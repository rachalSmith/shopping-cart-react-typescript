import { useState } from "react";

import { NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const title = "Name";
const navItems = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Shop", link: "/shop" },
];

interface IMobileDrawerProps {
  setIsMobileDrawerOpen: (value: boolean) => void;
}

const MobileDrawer = ({ setIsMobileDrawerOpen }: IMobileDrawerProps) => {
  return (
    <Box
      onClick={(prev) => setIsMobileDrawerOpen(!prev)}
      sx={{ textAlign: "center" }}
    >
      <Typography variant='h6' sx={{ my: 1.5 }}>
        {title}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={NavLink}
              to={item.link}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const NavBar = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component='nav'
        elevation={2}
        sx={{
          background: "white",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
            {navItems.map((item) => (
              <Button
                key={item.title}
                sx={{ color: "#000" }}
                component={NavLink}
                to={item.link}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <IconButton
          aria-label='go to shopping cart'
          component='label'
          sx={{ position: "relative", mr: 2 }}
        >
          <ShoppingBagOutlinedIcon sx={{ transform: "scale(1.2)" }} />
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
            0
          </Typography>
        </IconButton>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen((prev) => !prev)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <MobileDrawer
            setIsMobileDrawerOpen={() => setIsMobileDrawerOpen((prev) => !prev)}
          />
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
