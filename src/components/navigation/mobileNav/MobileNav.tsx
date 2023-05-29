import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { itemCategory } from "../../../../types/shopItem";
import { NavLink } from "react-router-dom";
import { pages } from "../helpers";
import NavButton from "../../common/navButton.tx/NavButton";

interface IMobileDrawerProps {
  setQuery: (value: itemCategory) => void;
}

const MobileNav = ({ setQuery }: IMobileDrawerProps) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <NavButton
          title={"Men"}
          link={"/shop"}
          setQuery={() => setQuery("men's clothing")}
        />
        <NavButton
          title={"Women"}
          link={"/shop"}
          setQuery={() => setQuery("women's clothing")}
        />
      </Box>

      <List>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={NavLink}
              to={page.link}
            >
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MobileNav;
