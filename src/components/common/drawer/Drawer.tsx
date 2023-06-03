import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";

type DisplaySettings = "block" | "none";

interface ISideDrawerprops {
  anchor: "top" | "left" | "bottom" | "right";
  children: ReactNode;
  isOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  title: string;
  width: string;
  responsiveDisplay: { xs: DisplaySettings; sm: DisplaySettings };
}

const Drawer = ({
  anchor,
  children,
  isOpen,
  setIsDrawerOpen,
  title,
  width,
  responsiveDisplay,
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
        display: responsiveDisplay,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: width,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
        }}
      >
        <Typography variant='h6' sx={{ my: 1.1 }}>
          {title}
        </Typography>
        <IconButton
          aria-label='close'
          sx={{ p: 0 }}
          onClick={() => setIsDrawerOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
