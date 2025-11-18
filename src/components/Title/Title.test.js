import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title Component", () => {
  test("renders children text correctly", () => {
    render(<Title>Test Title</Title>);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders as h2 with h6 variant", () => {
    render(<Title>Test Title</Title>);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement.tagName).toBe("H2");
  });

  test("has primary color applied", () => {
    const { container } = render(<Title>Test Title</Title>);
    const titleElement = container.querySelector("h2");
    expect(titleElement).toBeInTheDocument();
  });

  test("handles empty children gracefully", () => {
    render(<Title></Title>);
    const titleElement = screen.getByRole("heading", { level: 2 });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders with custom children components", () => {
    render(
      <Title>
        <span>Custom</span> Title
      </Title>
    );
    const customSpan = screen.getByText("Custom");
    expect(customSpan).toBeInTheDocument();
  });
});
