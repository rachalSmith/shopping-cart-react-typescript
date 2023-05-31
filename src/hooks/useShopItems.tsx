import { useEffect, useState } from "react";
import { IShopItem } from "../../types/shopItem";

const UseShopItems = () => {
  const [shopItems, setShopItems] = useState<IShopItem[]>([]);
  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    const response = await fetch("https://fakestoreapi.com/products/"); //  query for asc/desc
    const data = await response.json();

    setShopItems(data);
  };

  return { shopItems };
};

export default UseShopItems;
