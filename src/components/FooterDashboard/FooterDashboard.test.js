import { render, screen } from '@testing-library/react';
import FooterDashboard from './FooterDashboard';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('FooterDashboard Component', () => {
  const renderFooter = () => {
    return render(
      <ThemeProvider theme={theme}>
        <FooterDashboard />
      </ThemeProvider>
    );
  };

  test('renders footer without crashing', () => {
    renderFooter();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders Copyright component', () => {
    renderFooter();
    // Copyright component likely renders some text or link
    const copyrightElement = screen.getByRole('contentinfo');
    expect(copyrightElement).toBeInTheDocument();
  });

  test('renders Box with padding', () => {
    const { container } = renderFooter();
    const box = container.querySelector('div');
    expect(box).toBeInTheDocument();
  });
});
