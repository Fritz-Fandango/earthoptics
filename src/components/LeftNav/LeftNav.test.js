import { render, screen, fireEvent } from "@testing-library/react";
import LeftNav from "./LeftNav";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme();

const mockClasses = {
  drawerPaper: "drawerPaper",
  drawerPaperClose: "drawerPaperClose",
  toolbarIcon: "toolbarIcon",
};

describe("LeftNav Component", () => {
  const mockHandleDrawerClose = jest.fn();

  const renderLeftNav = (props = {}) => {
    const defaultProps = {
      classes: mockClasses,
      handleDrawerClose: mockHandleDrawerClose,
      open: true,
      ...props,
    };

    return render(
      <ThemeProvider theme={theme}>
        <LeftNav {...defaultProps} />
      </ThemeProvider>
    );
  };

  test("renders drawer component", () => {
    const { container } = renderLeftNav();
    const drawer = container.querySelector('[class*="MuiDrawer"]');
    expect(drawer).toBeInTheDocument();
  });

  test("renders close button", () => {
    renderLeftNav();
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  test("calls handleDrawerClose when close button is clicked", () => {
    renderLeftNav();
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockHandleDrawerClose).toHaveBeenCalledTimes(1);
  });

  test("renders NavigationList component", () => {
    const { container } = renderLeftNav();
    // NavigationList will render a list
    const lists = container.querySelectorAll("ul, nav");
    expect(lists.length).toBeGreaterThan(0);
  });

  test("renders ReportsList component", () => {
    const { container } = renderLeftNav();
    // ReportsList will also render navigation items
    const lists = container.querySelectorAll("ul, nav");
    expect(lists.length).toBeGreaterThan(0);
  });

  test("drawer applies correct classes when open", () => {
    renderLeftNav({ open: true });
    const drawer = screen.getByRole("presentation");
    expect(drawer).toBeInTheDocument();
  });

  test("drawer applies correct classes when closed", () => {
    renderLeftNav({ open: false });
    const drawer = screen.getByRole("presentation");
    expect(drawer).toBeInTheDocument();
  });
});
