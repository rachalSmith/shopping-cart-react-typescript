import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardMedia, Typography, styled } from "@mui/material";

interface ItemCardProps {
  item: IShopItem;
}

const StyledCardActionArea = styled(CardActionArea)({
  paddingTop: "8px",
  height: "88px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "baseline",
  ".MuiCardActionArea-focusHighlight": {
    background: "transparent",
  },
});

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <CardMedia
            image={item.image}
            title={item.title}
            sx={{
              objectFit: "scale-down",
              aspectRatio: "2/2.7",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></CardMedia>
          <StyledCardActionArea>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='subtitle2'>£{item.price}</Typography>
          </StyledCardActionArea>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
