import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";

interface ItemCardProps {
  item: IShopItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined'>
        <CardContent sx={{ background: "gray" }}>
          <img src={item.image} alt={item.title} width='500' height='600' />
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
