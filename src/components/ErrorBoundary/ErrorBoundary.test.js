import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const theme = createMuiTheme();

// Component that throws an error
const ThrowError = () => {
  throw new Error("Test error");
};

// Component that renders successfully
const SuccessComponent = () => <div>Success</div>;

describe("ErrorBoundary Component", () => {
  // Suppress console.error for these tests
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>{component}</ErrorBoundary>
      </ThemeProvider>
    );
  };

  test("renders children when there is no error", () => {
    renderWithTheme(<SuccessComponent />);
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  test("displays error message when child component throws", () => {
    renderWithTheme(<ThrowError />);
    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
  });

  test("displays helpful message to user", () => {
    renderWithTheme(<ThrowError />);
    expect(
      screen.getByText(/We're sorry for the inconvenience/)
    ).toBeInTheDocument();
  });

  test("displays refresh suggestion", () => {
    renderWithTheme(<ThrowError />);
    expect(
      screen.getByText(/Please try refreshing the page/)
    ).toBeInTheDocument();
  });

  test("renders Try Again button", () => {
    renderWithTheme(<ThrowError />);
    const button = screen.getByRole("button", { name: /Try Again/i });
    expect(button).toBeInTheDocument();
  });

  test("does not show error details in production mode", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    renderWithTheme(<ThrowError />);
    expect(screen.queryByText(/Error Details/i)).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  test("shows error details in development mode", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    renderWithTheme(<ThrowError />);
    expect(
      screen.getByText(/Error Details \(Development Only\)/i)
    ).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  test("catches and stores error information", () => {
    renderWithTheme(<ThrowError />);
    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
  });
});
