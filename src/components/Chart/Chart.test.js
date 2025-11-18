import { render, screen } from '@testing-library/react';
import Chart from './Chart';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('Chart Component', () => {
  const renderChart = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Chart />
      </ThemeProvider>
    );
  };

  test('renders chart title "Today"', () => {
    renderChart();
    const title = screen.getByText('Today');
    expect(title).toBeInTheDocument();
  });

  test('renders chart container', () => {
    const { container } = renderChart();
    // Check if ResponsiveContainer is rendered
    const chartContainer = container.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  test('renders line chart with data points', () => {
    const { container } = renderChart();
    // Recharts creates SVG elements for chart rendering
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  test('displays Y-axis label "Sales ($)"', () => {
    renderChart();
    const yAxisLabel = screen.getByText('Sales ($)');
    expect(yAxisLabel).toBeInTheDocument();
  });

  test('renders without crashing with default props', () => {
    renderChart();
    // If component rendered successfully, this test passes
    const title = screen.getByText('Today');
    expect(title).toBeInTheDocument();
  });
});
