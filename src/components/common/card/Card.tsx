import { ReactNode, useState } from "react";

import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  styled,
  CardProps,
} from "@mui/material";

import { IShopItem } from "../../../../types/shopItem";

interface ICardProps {
  item: IShopItem;
  children: ReactNode;
  orientation: "column" | "row";
  elevation: CardProps["elevation"];
  quickAddButton?: ReactNode;
}

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  justifyContent: "space-between",
  alignItems: "stretch",
  ".MuiCardActionArea-focusHighlight": {
    background: "transparent",
  },
  padding: "8px 8px 0px 8px",
  minHeight: "75px",
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
  minWidth: "25%",
  margin: "16px",
});

const Card = ({
  item,
  quickAddButton,
  children,
  orientation,
  elevation,
}: ICardProps) => {
  const [isDisplayAddButton, setIsDisplayAddButton] = useState<boolean>(false);
  return (
    <>
      <MuiCard
        onMouseOver={() => setIsDisplayAddButton(true)}
        onMouseOut={() => setIsDisplayAddButton(false)}
        elevation={elevation}
        sx={{
          display: "flex",
          flexDirection: orientation,
        }}
      >
        <StyledCardMedia image={item.image} title={item.title}>
          {isDisplayAddButton && quickAddButton && quickAddButton}
        </StyledCardMedia>

        <StyledCardContent>{children}</StyledCardContent>
      </MuiCard>
    </>
  );
};

export default Card;
