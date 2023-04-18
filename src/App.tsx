import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/store' element={<Shop />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
