import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";

import {
  CardActionArea,
  CardMedia,
  Fab,
  Typography,
  styled,
} from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";

interface ItemCardProps {
  item: IShopItem;
}

const StyledCardActionArea = styled(CardActionArea)({
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

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <CardMedia
            image={item.image}
            title={item.title}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              objectFit: "scale-down",
              aspectRatio: "2/2.7",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Fab variant='extended' size='medium' sx={{ mb: 2 }}>
              <AddIcon />
              Quick Add
            </Fab>
          </CardMedia>
          <StyledCardActionArea>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='subtitle2'>
              {formatCurrency(item.price)}
            </Typography>
          </StyledCardActionArea>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
