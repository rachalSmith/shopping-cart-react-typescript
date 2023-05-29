import { useEffect, useState } from "react";

import Card from "../../components/common/card/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import { formatCurrency } from "../../utils/formatCurrency";

import { IShopItem } from "../../../types/shopItem";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const QuickAddButton = ({ id }: { id: number }) => {
  const { onIncrementCart } = useShoppingCart();

  return (
    <Fab
      variant='extended'
      size='medium'
      sx={{ mb: 2 }}
      onClick={() => onIncrementCart(id)}
    >
      <AddIcon />
      Quick Add
    </Fab>
  );
};

interface ICardContentProps {
  title: string;
  price: number;
}

const CardContent = ({ title, price }: ICardContentProps) => {
  return (
    <>
      <Typography variant='caption'>{title}</Typography>
      <Typography variant='subtitle2'>{formatCurrency(price)}</Typography>
    </>
  );
};

const Shop = () => {
  const [shopItems, setShopItems] = useState<IShopItem[]>([]);
  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    const response = await fetch("https://fakestoreapi.com/products/"); //  query for asc/desc
    const data = await response.json();

    setShopItems(data);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {shopItems.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              item={item}
              orientation='column'
              quickAddButton={<QuickAddButton id={item.id} />}
            >
              <CardContent title={item.title} price={item.price} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
