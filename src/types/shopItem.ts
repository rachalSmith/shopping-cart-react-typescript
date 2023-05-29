export type itemCategory = "men's clothing" | "women's clothing";

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
