import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer from "./Drawer";

const childText = "Child Content";

const child = <div>{childText}</div>;

describe("Drawer component", () => {
  it("should be visible when isOpen is true", () => {
    render(
      <Drawer
        anchor='left'
        isOpen={true}
        setIsDrawerOpen={() => {}}
        title='Test Drawer'
      >
        {child}
      </Drawer>
    );

    const text = screen.getByText(childText);
    expect(text).toBeVisible();
  });

  it("should become hidden when clicking on the close icon", () => {
    const setIsDrawerOpen = jest.fn();
    render(
      <Drawer
        anchor='left'
        isOpen={true}
        setIsDrawerOpen={setIsDrawerOpen}
        title='Test Drawer'
      >
        {child}
      </Drawer>
    );

    const closeButton = screen.getByLabelText("close");

    userEvent.click(closeButton);

    expect(setIsDrawerOpen).toHaveBeenCalledWith(false);
  });
});
