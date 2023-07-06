import renderer from "react-test-renderer";

import Card from "./Card";
import { IShopItem } from "../../../../types/shopItem";

const item: IShopItem = {
  category: "men's clothing",
  description: "description",
  id: 1,
  image: "test.png",
  price: 10,
  rating: { rating: 5, count: 10 },
  title: "title",
};

const children = <div>child</div>;
const button = <button>button</button>;

describe("Card component", () => {
  it("should render the card image and children in a row when orientation is 'row'", () => {
    const tree = renderer
      .create(
        <Card item={item} orientation='row' elevation={2}>
          {children}
        </Card>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render the card image and content in a column when orientation is 'column'", () => {
    const tree = renderer
      .create(
        <Card item={item} orientation='column' elevation={2}>
          {children}
        </Card>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render a button if one is passed in as a prop", () => {
    const tree = renderer
      .create(
        <Card
          item={item}
          quickAddButton={button}
          orientation='column'
          elevation={2}
        >
          {children}
        </Card>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
