import { render, screen } from '@testing-library/react';
import Copyright from './Copyright';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('Copyright Component', () => {
  const renderCopyright = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Copyright />
      </ThemeProvider>
    );
  };

  test('renders copyright text', () => {
    renderCopyright();
    const copyrightText = screen.getByText(/Copyright © Martín Moreno for/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders EarthOptics link', () => {
    renderCopyright();
    const link = screen.getByRole('link', { name: /EarthOptics/i });
    expect(link).toBeInTheDocument();
  });

  test('link has correct href', () => {
    renderCopyright();
    const link = screen.getByRole('link', { name: /EarthOptics/i });
    expect(link).toHaveAttribute('href', 'https://earthoptics.com/');
  });

  test('displays current year', () => {
    renderCopyright();
    const currentYear = new Date().getFullYear().toString();
    const yearText = screen.getByText(new RegExp(currentYear));
    expect(yearText).toBeInTheDocument();
  });

  test('renders as body2 typography', () => {
    renderCopyright();
    const copyrightElement = screen.getByText(/Copyright © Martín Moreno for/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  test('text is centered', () => {
    const { container } = renderCopyright();
    const typography = container.querySelector('[class*="MuiTypography"]');
    expect(typography).toBeInTheDocument();
  });
});
