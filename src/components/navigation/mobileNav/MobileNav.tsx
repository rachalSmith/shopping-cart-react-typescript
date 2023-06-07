import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "../../../mui";
import { NavLink } from "react-router-dom";
import { pages } from "../helpers";
import NavButton from "../../common/navButton.tx/NavButton";

const MobileNav = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <NavButton title={"Men"} link={"/shop/men"} />
        <NavButton title={"Women"} link={"/shop/women"} />
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
