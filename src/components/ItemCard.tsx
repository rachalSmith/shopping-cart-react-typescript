import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

interface ItemCardProps {
  item: IShopItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined' sx={{ border: "red solid" }}>
        <CardContent sx={{ background: "gray" }}>
          <Box
            sx={{
              objectFit: "scale-down",
              aspectRatio: "2/2.7",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: `url(${item.image})`,
            }}
          ></Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
