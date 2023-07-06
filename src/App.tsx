import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";

import { ShoppingCartProvider } from "./context/shoppingCart/ShoppingCartContext";
import NavContainer from "./components/navigation/navContainer/NavContainer";
import ShoppingCartContainer from "./components/shoppingCart/shoppingCartContainer/ShoppingCartContainer";
import { Box, Container } from "./mui";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./mui/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ShoppingCartProvider>
        <NavContainer />
        <ShoppingCartContainer />
        <Box
          sx={{
            height: "100vh",
            py: 8,
            mx: -1,
            background: "#F8F8F8",
          }}
        >
          <Container sx={{ p: 0 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop/:category' element={<Shop />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Container>
        </Box>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}

export default App;
