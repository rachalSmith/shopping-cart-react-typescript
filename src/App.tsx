import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import NavBar from "./components/nav/NavBar";
import Box from "@mui/material/Box";
import { ShoppingBagProvider } from "./context/ShoppingBagContext";

function App() {
  return (
    <ShoppingBagProvider>
      <NavBar />
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
    </ShoppingBagProvider>
  );
}

export default App;
