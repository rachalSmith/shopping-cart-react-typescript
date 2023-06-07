import { Button } from "../../../mui";
import { NavLink } from "react-router-dom";

interface INavButtonProps {
  title: string;
  link: string;
  setShopCategoryQuery?: () => void;
}

const NavButton = ({ title, link, setShopCategoryQuery }: INavButtonProps) => {
  if (link[0] !== "/") {
    throw new Error("Link is missing /");
  }

  return (
    <Button
      sx={{ color: "#000" }}
      onClick={setShopCategoryQuery}
      component={NavLink}
      to={link}
    >
      {title}
    </Button>
  );
};

export default NavButton;
