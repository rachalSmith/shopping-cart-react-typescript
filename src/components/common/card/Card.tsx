import { ReactNode } from "react";

import { styled } from "@mui/material";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { IShopItem } from "../../../../types/shopItem";

interface ICardProps {
  item: IShopItem;
  children: ReactNode;
  orientation: "column" | "row";
  quickAddButton?: ReactNode;
}

const StyledCardContent = styled(CardContent)({
  paddingTop: "16px",
  height: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "baseline",
  ".MuiCardActionArea-focusHighlight": {
    background: "transparent",
  },
});

const StyledCardMedia = styled(CardMedia)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  objectFit: "scale-down",
  aspectRatio: "2/2.7",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  border: "yellow solid",
});

const Card = ({ item, quickAddButton, children, orientation }: ICardProps) => {
  return (
    <>
      <MuiCard
        variant='outlined'
        sx={{
          border: "red solid",
          display: "flex",
          flexDirection: orientation,
        }}
      >
        <StyledCardMedia image={item.image} title={item.title}>
          {quickAddButton && quickAddButton}
        </StyledCardMedia>

        <StyledCardContent>{children}</StyledCardContent>
      </MuiCard>
    </>
  );
};

export default Card;
