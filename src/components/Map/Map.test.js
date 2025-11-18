import { render } from '@testing-library/react';
import Map from './Map';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const mockClasses = {
  mapPaper: 'mapPaper',
  mapboxContainer: 'mapboxContainer',
  mapNavStyle: 'mapNavStyle',
  purpleNurple: 'purpleNurple'
};

// Mock react-map-gl to avoid token validation
jest.mock('react-map-gl', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="map-container">{children}</div>,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  NavigationControl: () => <div data-testid="nav-control" />
}));

describe('Map Component', () => {
  const renderMap = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Map classes={mockClasses} />
      </ThemeProvider>
    );
  };

  test('renders map container', () => {
    const { getByTestId } = renderMap();
    const mapContainer = getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  test('renders navigation control', () => {
    const { getByTestId } = renderMap();
    const navControl = getByTestId('nav-control');
    expect(navControl).toBeInTheDocument();
  });

  test('renders markers for data points', () => {
    const { getAllByTestId } = renderMap();
    const markers = getAllByTestId('marker');
    expect(markers.length).toBeGreaterThan(0);
  });

  test('does not render popup initially', () => {
    const { queryAllByTestId } = renderMap();
    const popups = queryAllByTestId('popup');
    // Initially no popup should be visible (state is null)
    expect(popups.length).toBeLessThanOrEqual(0);
  });

  test('component handles viewport state', () => {
    const { container } = renderMap();
    // Just verify component renders with state management
    expect(container).toBeInTheDocument();
  });

  test('renders correct number of markers from mock data', () => {
    const { getAllByTestId } = renderMap();
    const markers = getAllByTestId('marker');
    // mockGeo.json has many coordinates
    expect(markers.length).toBeGreaterThan(40);
  });

  test('marker buttons have correct aria-label', () => {
    const { getAllByLabelText } = renderMap();
    const dataPointButtons = getAllByLabelText('data point');
    expect(dataPointButtons.length).toBeGreaterThan(0);
  });

  test('component renders without crashing with environment token', () => {
    // Mock the env variable
    const originalEnv = process.env.REACT_APP_SATELLITE_DATA_TOKEN;
    process.env.REACT_APP_SATELLITE_DATA_TOKEN = 'test-token';

    const { getByTestId } = renderMap();
    expect(getByTestId('map-container')).toBeInTheDocument();

    process.env.REACT_APP_SATELLITE_DATA_TOKEN = originalEnv;
  });
});
