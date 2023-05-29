import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface ISideDrawerprops {
  anchor: "top" | "left" | "bottom" | "right";
  children: ReactNode;
  isOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  title: string;
  width: string;
}

const Drawer = ({
  anchor,
  children,
  isOpen,
  setIsDrawerOpen,
  title,
  width,
}: ISideDrawerprops) => {
  return (
    <MuiDrawer
      anchor={anchor}
      variant='temporary'
      open={isOpen}
      onClose={() => setIsDrawerOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        // this needs to be passed in
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: width,
        },
      }}
    >
      <Box onClick={() => setIsDrawerOpen(false)} sx={{ textAlign: "center" }}>
        <Typography variant='h6' sx={{ my: 1.5 }}>
          {title}
        </Typography>
        <Divider />
      </Box>
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
