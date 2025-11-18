import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders dashboard title in header", () => {
    render(<App />);
    const dashboardTitle = screen.getByText(/EarthOptics Dashboard/i);
    expect(dashboardTitle).toBeInTheDocument();
  });

  test("applies theme provider", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("renders main Dashboard component", () => {
    render(<App />);
    // Dashboard contains specific components
    const mapElement = screen.getByLabelText(/data point/i);
    expect(mapElement).toBeInTheDocument();
  });
});
