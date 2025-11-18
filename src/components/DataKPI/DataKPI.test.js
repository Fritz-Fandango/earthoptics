import { render, screen } from '@testing-library/react';
import DataKPI from './DataKPI';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('DataKPI (Deposits) Component', () => {
  const renderDataKPI = () => {
    return render(
      <ThemeProvider theme={theme}>
        <DataKPI />
      </ThemeProvider>
    );
  };

  test('renders component without crashing', () => {
    renderDataKPI();
    expect(screen.getByText(/Recent Soil Deposits Expenditures/i)).toBeInTheDocument();
  });

  test('displays deposit amount', () => {
    renderDataKPI();
    const amount = screen.getByText('$3,024.00');
    expect(amount).toBeInTheDocument();
  });

  test('displays title "Recent Soil Deposits Expenditures"', () => {
    renderDataKPI();
    const title = screen.getByText(/Recent Soil Deposits Expenditures/i);
    expect(title).toBeInTheDocument();
  });

  test('displays current date in format', () => {
    renderDataKPI();
    // The date format will be like "on 11/18/2025" (varies based on current date)
    const dateText = screen.getByText(/on \d+\/\d+\/\d+/);
    expect(dateText).toBeInTheDocument();
  });

  test('renders "View other data" link', () => {
    renderDataKPI();
    const link = screen.getByText('View other data');
    expect(link).toBeInTheDocument();
  });

  test('link has correct href attribute', () => {
    renderDataKPI();
    const link = screen.getByText('View other data');
    expect(link).toHaveAttribute('href', '#');
  });

  test('displays correct typography variants', () => {
    const { container } = renderDataKPI();
    const headings = container.querySelectorAll('h2, h4, p');
    expect(headings.length).toBeGreaterThan(0);
  });
});
