import { IShopItem } from "./shopItem";

export interface ICartItem extends IShopItem {
  quantity: number;
}
