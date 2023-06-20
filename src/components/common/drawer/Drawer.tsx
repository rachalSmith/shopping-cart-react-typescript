import { ReactNode } from "react";
import {
  CloseIcon,
  MuiDrawer,
  Box,
  Divider,
  IconButton,
  Typography,
} from "../../../mui";
import { styled } from "@mui/material";

interface ISideDrawerprops {
  anchor: "top" | "left" | "bottom" | "right";
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  title: string;
}

const Drawer = ({
  anchor,
  children,
  isOpen,
  setIsDrawerOpen,
  title,
  className,
}: ISideDrawerprops) => {
  return (
    <MuiDrawer
      className={className}
      anchor={anchor}
      variant='temporary'
      open={isOpen}
      onClose={() => setIsDrawerOpen(false)}
      ModalProps={{
        keepMounted: true,
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

export default styled(Drawer)({});
