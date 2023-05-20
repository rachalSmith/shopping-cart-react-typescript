import { useEffect, useState } from "react";
import { itemCategory } from "../components/nav/NavBar";

import ItemCard from "../components/ItemCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

interface IShopItemRating {
  rating: number;
  count: number;
}

export interface IShopItem {
  category: itemCategory;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: IShopItemRating;
  title: string;
}

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
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
