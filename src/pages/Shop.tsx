import Box from "@mui/material/Box";
import { useEffect } from "react";

const Shop = () => {
  useEffect(() => {
    fetchShopData();
  }, []);

  useEffect(() => {
    fetchShopCategories();
  }, []);

  const fetchShopData = async () => {
    const response = await fetch("https://fakestoreapi.com/products/"); //  query for asc/desc
    const data = await response.json();

    console.log(data);
  };

  const fetchShopCategories = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();

    console.log(data);
  };

  return <Box sx={{ pt: 7 }}>shop</Box>;
};

export default Shop;
