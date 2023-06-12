import { AddIcon, Container, Fab, Grid, Typography } from "../../mui";
import { useParams } from "react-router";

import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/shoppingCart/ShoppingCartContext";
import { IShopItem } from "../../../types/shopItem";
import useFetch from "../../hooks/useFetch";
import Card from "../../components/common/card/Card";

const QuickAddButton = ({ item }: { item: IShopItem }) => {
  const { cartDispatch } = useShoppingCart();

  return (
    <Fab
      variant='extended'
      size='medium'
      sx={{ mb: 2 }}
      onClick={() => cartDispatch({ type: "INCREASE_CART", payload: item })}
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
  const { category } = useParams();

  const { data } = useFetch(
    `https://fakestoreapi.com/products/category/${category}'s clothing`
  );

  const shopItems = data as IShopItem[];

  return (
    <Container>
      <Grid container spacing={4}>
        {shopItems.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              item={item}
              orientation='column'
              quickAddButton={<QuickAddButton item={item} />}
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
