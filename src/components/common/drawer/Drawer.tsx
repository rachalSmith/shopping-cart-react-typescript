import { ReactNode } from "react";
import {
  Drawer as MuiDrawer,
  Box,
  styled,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      <Divider sx={{ mt: 0.75, mb: 1 }} />
      {children}
    </MuiDrawer>
  );
};

export default styled(Drawer)({});
