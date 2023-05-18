import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";

interface ItemCardProps {
  item: IShopItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined'>
        <CardContent sx={{ background: "gray" }}>
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
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
