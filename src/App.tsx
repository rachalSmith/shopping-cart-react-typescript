import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";

import { ShoppingCartProvider } from "./context/shoppingCart/ShoppingCartContext";
import NavContainer from "./components/navigation/navContainer/NavContainer";
import ShoppingCartContainer from "./components/shoppingCart/shoppingCartContainer/ShoppingCartContainer";
import { Box } from "./mui";

function App() {
  return (
    <ShoppingCartProvider>
      <NavContainer />
      <ShoppingCartContainer />
      <Box
        sx={{
          px: 3,
          py: 10,

          backgroundColor: "#F5F5F5",
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop/:category' element={<Shop />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
    </ShoppingCartProvider>
  );
}

export default App;
