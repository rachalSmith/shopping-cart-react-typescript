import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavButton from "./NavButton";
import userEvent from "@testing-library/user-event";

const invalidLink = "example.com";
const validLink = "/";

describe("NavButton component", () => {
  it("should error if the link passed in is invalid", async () => {
    expect(() => {
      render(
        <MemoryRouter>
          <NavButton title='Test Button' link={invalidLink} />
        </MemoryRouter>
      );
    }).toThrowError("Link is missing /");
  });

  it("should navigate to the specified link when the button is clicked", async () => {
    render(
      <MemoryRouter>
        <NavButton title='Test Button' link={validLink} />
      </MemoryRouter>
    );

    const button = screen.getByText("Test Button");
    userEvent.click(button);

    expect(button).toBeVisible();
    expect(window.location.pathname).toBe(validLink);
  });
});
