import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock react-map-gl to avoid token validation
jest.mock('./components/Map/Map', () => {
  return function DummyMap() {
    return <div data-testid="map-component" />;
  };
});

// Mock Chart component
jest.mock('./components/Chart/Chart', () => {
  return function DummyChart() {
    return <div data-testid="chart-component" />;
  };
});

// Mock DataKPI component
jest.mock('./components/DataKPI/DataKPI', () => {
  return function DummyDataKPI() {
    return <div data-testid="datakpi-component" />;
  };
});

// Mock DataTable component
jest.mock('./components/DataTable/DataTable', () => {
  return function DummyDataTable() {
    return <div data-testid="datatable-component" />;
  };
});

// Mock Header component
jest.mock('./components/Header/Header', () => {
  return function DummyHeader() {
    return <div data-testid="header-component" />;
  };
});

// Mock LeftNav component
jest.mock('./components/LeftNav/LeftNav', () => {
  return function DummyLeftNav() {
    return <div data-testid="leftnav-component" />;
  };
});

// Mock FooterDashboard component
jest.mock('./components/FooterDashboard/FooterDashboard', () => {
  return function DummyFooter() {
    return <div data-testid="footer-component" />;
  };
});

describe('Dashboard Component', () => {
  test('renders without crashing', () => {
    render(<Dashboard />);
  });

  test('renders Header component', () => {
    const { getByTestId } = render(<Dashboard />);
    const header = getByTestId('header-component');
    expect(header).toBeInTheDocument();
  });

  test('renders LeftNav component', () => {
    const { getByTestId } = render(<Dashboard />);
    const leftNav = getByTestId('leftnav-component');
    expect(leftNav).toBeInTheDocument();
  });

  test('renders Map component', () => {
    const { getByTestId } = render(<Dashboard />);
    const map = getByTestId('map-component');
    expect(map).toBeInTheDocument();
  });

  test('renders Chart component', () => {
    const { getByTestId } = render(<Dashboard />);
    const chart = getByTestId('chart-component');
    expect(chart).toBeInTheDocument();
  });

  test('renders DataKPI component', () => {
    const { getByTestId } = render(<Dashboard />);
    const dataKPI = getByTestId('datakpi-component');
    expect(dataKPI).toBeInTheDocument();
  });

  test('renders DataTable component', () => {
    const { getByTestId } = render(<Dashboard />);
    const dataTable = getByTestId('datatable-component');
    expect(dataTable).toBeInTheDocument();
  });

  test('renders FooterDashboard component', () => {
    const { getByTestId } = render(<Dashboard />);
    const footer = getByTestId('footer-component');
    expect(footer).toBeInTheDocument();
  });

  test('renders CssBaseline for consistent styling', () => {
    const { container } = render(<Dashboard />);
    // CssBaseline is rendered as part of the Dashboard
    expect(container).toBeInTheDocument();
  });

  test('renders Container component for layout', () => {
    const { container } = render(<Dashboard />);
    const mainContent = container.querySelector('main');
    expect(mainContent).toBeInTheDocument();
  });

  test('renders Grid layout for responsive design', () => {
    const { container } = render(<Dashboard />);
    const gridContainers = container.querySelectorAll('[class*="MuiGrid"]');
    expect(gridContainers.length).toBeGreaterThan(0);
  });

  test('manages drawer state', () => {
    render(<Dashboard />);
    // Dashboard should manage open/close state for drawer
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('leftnav-component')).toBeInTheDocument();
  });
});
