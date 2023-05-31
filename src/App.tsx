import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Box from "@mui/material/Box";

import { ShoppingCartProvider } from "./context/shoppingCart/ShoppingCartContext";
import NavContainer from "./components/navigation/navContainer/NavContainer";

function App() {
  return (
    <ShoppingCartProvider>
      <NavContainer />
      <Box
        sx={{
          px: 3,
          py: 10,

          backgroundColor: "#F5F5F5",
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
    </ShoppingCartProvider>
  );
}

export default App;
