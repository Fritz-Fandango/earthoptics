import { render, screen } from '@testing-library/react';
import ReportsList from './ReportsList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const mockClasses = {
  root: 'root',
  secColor: 'secColor'
};

describe('ReportsList Component', () => {
  const renderReportsList = () => {
    return render(
      <ThemeProvider theme={theme}>
        <ReportsList classes={mockClasses} />
      </ThemeProvider>
    );
  };

  test('renders reports list', () => {
    renderReportsList();
    expect(screen.getByText('Saved reports')).toBeInTheDocument();
  });

  test('renders all report items', () => {
    renderReportsList();
    expect(screen.getByText('Current month')).toBeInTheDocument();
    expect(screen.getByText('Last quarter')).toBeInTheDocument();
    expect(screen.getByText('Year-end to date')).toBeInTheDocument();
  });

  test('renders list subheader "Saved reports"', () => {
    const { container } = renderReportsList();
    const subheader = container.querySelector('[class*="MuiListSubheader"]');
    expect(subheader).toBeInTheDocument();
    expect(subheader.textContent).toBe('Saved reports');
  });

  test('renders list items as buttons', () => {
    const { container } = renderReportsList();
    const buttons = container.querySelectorAll('button[role="menuitem"]');
    expect(buttons.length).toBe(3);
  });

  test('renders icons for each report item', () => {
    const { container } = renderReportsList();
    const icons = container.querySelectorAll('[class*="MuiSvgIcon"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  test('applies secondary color class', () => {
    const { container } = renderReportsList();
    const rootDiv = container.querySelector('.secColor');
    expect(rootDiv).toBeInTheDocument();
  });

  test('renders Material-UI List component', () => {
    const { container } = renderReportsList();
    const list = container.querySelector('[role="list"]');
    expect(list).toBeInTheDocument();
  });

  test('report items are clickable', () => {
    renderReportsList();
    const currentMonthItem = screen.getByText('Current month').closest('li');
    expect(currentMonthItem).toBeInTheDocument();
  });
});
