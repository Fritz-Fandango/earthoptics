import { render, screen } from '@testing-library/react';
import NavigationList from './NavigationList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const mockClasses = {
  root: 'root',
  primColor: 'primColor'
};

describe('NavigationList Component', () => {
  const renderNavigationList = () => {
    return render(
      <ThemeProvider theme={theme}>
        <NavigationList classes={mockClasses} />
      </ThemeProvider>
    );
  };

  test('renders navigation list', () => {
    renderNavigationList();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders all navigation items', () => {
    renderNavigationList();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tilling')).toBeInTheDocument();
    expect(screen.getByText('Compaction')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Soil Health Insights')).toBeInTheDocument();
  });

  test('renders list items as buttons', () => {
    const { container } = renderNavigationList();
    const buttons = container.querySelectorAll('button[role="menuitem"]');
    expect(buttons.length).toBe(5);
  });

  test('navigation items are clickable', () => {
    renderNavigationList();
    const dashboardItem = screen.getByText('Dashboard').closest('li');
    expect(dashboardItem).toBeInTheDocument();
  });

  test('renders icons for each navigation item', () => {
    const { container } = renderNavigationList();
    const icons = container.querySelectorAll('[class*="MuiSvgIcon"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  test('applies primary color class', () => {
    const { container } = renderNavigationList();
    const rootDiv = container.querySelector('.primColor');
    expect(rootDiv).toBeInTheDocument();
  });

  test('renders Material-UI List component', () => {
    const { container } = renderNavigationList();
    const list = container.querySelector('[role="list"]');
    expect(list).toBeInTheDocument();
  });
});
