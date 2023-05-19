import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import NavBar from "./components/nav/NavBar";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          px: 3,
          my: 10,

          backgroundColor: "#F5F5F5",
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;