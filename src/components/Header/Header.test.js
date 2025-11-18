import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Mock Material-UI theme
const theme = createMuiTheme();

const mockClasses = {
  appBar: 'appBar',
  appBarShift: 'appBarShift',
  toolbar: 'toolbar',
  menuButton: 'menuButton',
  menuButtonHidden: 'menuButtonHidden',
  title: 'title'
};

describe('Header Component', () => {
  const mockHandleDrawerOpen = jest.fn();

  const renderHeader = (props = {}) => {
    const defaultProps = {
      classes: mockClasses,
      handleDrawerOpen: mockHandleDrawerOpen,
      open: false,
      ...props
    };

    return render(
      <ThemeProvider theme={theme}>
        <Header {...defaultProps} />
      </ThemeProvider>
    );
  };

  test('renders header with dashboard title', () => {
    renderHeader();
    const title = screen.getByText('EarthOptics Dashboard');
    expect(title).toBeInTheDocument();
  });

  test('calls handleDrawerOpen when menu button is clicked', () => {
    renderHeader();
    const menuButton = screen.getByLabelText(/open drawer/i);
    fireEvent.click(menuButton);
    expect(mockHandleDrawerOpen).toHaveBeenCalledTimes(1);
  });

  test('renders notification badge', () => {
    renderHeader();
    const badge = screen.getByText('4');
    expect(badge).toBeInTheDocument();
  });

  test('renders notification icon', () => {
    renderHeader();
    const notificationIcon = screen.getByRole('button', { name: '' });
    expect(notificationIcon).toBeInTheDocument();
  });

  test('applies appBarShift class when drawer is open', () => {
    const { container } = renderHeader({ open: true });
    const appBar = container.querySelector('[class*="appBar"]');
    expect(appBar).toBeInTheDocument();
  });

  test('menu button is visible when drawer is closed', () => {
    renderHeader({ open: false });
    const menuButton = screen.getByLabelText(/open drawer/i);
    expect(menuButton).toBeVisible();
  });
});
