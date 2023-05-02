import Card from "@mui/material/Card";
import { IShopItem } from "../pages/Shop";
import CardContent from "@mui/material/CardContent";

interface ItemCardProps {
  item: IShopItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <>
      <Card variant='outlined' sx={{ border: "red solid", minWidth: "20%" }}>
        <CardContent sx={{ background: "gray" }}>
          {/* <img
            loading='lazy'
            src={item.image}
            alt={item.title}
            style={{
              minWidth: "300px",
              maxWidth: "400px",
              height: "200px",
              objectFit: "scale-down",
              aspectRatio: "2/1",
            }}
          /> */}
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
