import { useEffect, useState } from "react";
import { itemCategory } from "../components/nav/NavBar";

import ItemCard from "../components/ItemCard";

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
    <>
      {shopItems.map((item) => (
        <>
          <ItemCard item={item} />
        </>
      ))}
    </>
  );
};

export default Shop;
