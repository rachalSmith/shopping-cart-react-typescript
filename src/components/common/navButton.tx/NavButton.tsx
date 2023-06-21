import { styled } from "@mui/material";
import { Button } from "../../../mui";
import { NavLink } from "react-router-dom";

interface INavButtonProps {
  title: string;
  link: string;
  className?: string;
}

const NavButton = ({ title, link, className }: INavButtonProps) => {
  if (link[0] !== "/") {
    throw new Error("Link is missing /");
  }

  return (
    <Button
      className={className}
      sx={{ color: "#000" }}
      component={NavLink}
      to={link}
    >
      {title}
    </Button>
  );
};

export default styled(NavButton)({});
