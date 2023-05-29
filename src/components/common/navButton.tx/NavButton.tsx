import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import { itemCategory } from "../../../../types/shopItem";

interface INavButtonProps {
  title: string;
  link: string;
  setQuery?: (value: itemCategory) => void;
}

const NavButton = ({ title, link, setQuery }: INavButtonProps) => {
  if (link[0] !== "/") {
    throw new Error("Link is missing /");
  }

  return (
    <Button
      sx={{ color: "#000" }}
      //   onClick={(setQuery && setQuery(query)}
      component={NavLink}
      to={link}
    >
      {title}
    </Button>
  );
};

export default NavButton;
