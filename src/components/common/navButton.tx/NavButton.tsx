import { ButtonProps, styled } from "@mui/material";
import { Button } from "../../../mui";
import { NavLink } from "react-router-dom";

interface INavButtonProps {
  title: string;
  link: string;
  className?: string;
  variant?: ButtonProps["variant"];
  disableElevation?: ButtonProps["disableElevation"];
}

const NavButton = ({
  title,
  link,
  className,
  variant,
  disableElevation,
}: INavButtonProps) => {
  if (link[0] !== "/") {
    throw new Error("Link is missing /");
  }

  return (
    <Button
      color='primary'
      variant={variant}
      disableElevation={disableElevation}
      className={className}
      component={NavLink}
      to={link}
    >
      {title}
    </Button>
  );
};

export default styled(NavButton)({});
