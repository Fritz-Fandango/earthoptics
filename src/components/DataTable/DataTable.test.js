import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('DataTable Component', () => {
  const renderDataTable = () => {
    return render(
      <ThemeProvider theme={theme}>
        <DataTable />
      </ThemeProvider>
    );
  };

  test('renders table without crashing', () => {
    renderDataTable();
    expect(screen.getByText(/GEO JSON Data Points/i)).toBeInTheDocument();
  });

  test('renders table title "GEO JSON Data Points"', () => {
    renderDataTable();
    const title = screen.getByText(/GEO JSON Data Points/i);
    expect(title).toBeInTheDocument();
  });

  test('renders table with correct columns', () => {
    renderDataTable();
    expect(screen.getByText('Point')).toBeInTheDocument();
    expect(screen.getByText('Latitude')).toBeInTheDocument();
    expect(screen.getByText('Longitude')).toBeInTheDocument();
    expect(screen.getByText('Co-ordinates')).toBeInTheDocument();
  });

  test('renders table with data rows', () => {
    const { container } = renderDataTable();
    const tableRows = container.querySelectorAll('tbody tr');
    expect(tableRows.length).toBeGreaterThan(0);
  });

  test('displays first 15 coordinates', () => {
    const { container } = renderDataTable();
    const tableRows = container.querySelectorAll('tbody tr');
    expect(tableRows.length).toBeLessThanOrEqual(15);
  });

  test('renders latitude and longitude values', () => {
    renderDataTable();
    // Mock data contains coordinates like 42.70415, -92.653967
    const cells = screen.getAllByText(/42\.\d+/);
    expect(cells.length).toBeGreaterThan(0);
  });

  test('renders "See more data points" link', () => {
    renderDataTable();
    const link = screen.getByText('See more data points');
    expect(link).toBeInTheDocument();
  });

  test('table has correct structure', () => {
    const { container } = renderDataTable();
    const table = container.querySelector('table');
    const thead = container.querySelector('thead');
    const tbody = container.querySelector('tbody');
    
    expect(table).toBeInTheDocument();
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });

  test('coordinates are formatted correctly in table', () => {
    renderDataTable();
    // Check for coordinate format like "(42.70415, -92.653967)"
    const coordinateCells = screen.getAllByText(/\(\d+\.\d+, -\d+\.\d+\)/);
    expect(coordinateCells.length).toBeGreaterThan(0);
  });
});
