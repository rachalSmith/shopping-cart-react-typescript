import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "../../../mui";
import { NavLink, useLocation } from "react-router-dom";
import { pages } from "../helpers";
import NavButton from "../../common/navButton.tx/NavButton";

const MobileNav = () => {
  const location = useLocation();
  const mensLink = "/shop/men";
  const womensLink = "/shop/women";

  const getButtonVarient = (link: string) => {
    if (location.pathname === link) {
      return "contained";
    }
    return "text";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          mx: 1,
        }}
      >
        <NavButton
          variant={getButtonVarient(mensLink)}
          disableElevation
          sx={{ width: "50%" }}
          title={"Men"}
          link={mensLink}
        />
        <NavButton
          variant={getButtonVarient(womensLink)}
          disableElevation
          sx={{ width: "50%" }}
          title={"Women"}
          link={womensLink}
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
