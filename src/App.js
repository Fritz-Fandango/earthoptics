// Material UI theme functions
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Material UI colors
import brown from "@material-ui/core/colors/brown";
import green from "@material-ui/core/colors/green";

// Dashboard component
import Dashboard from "./Dashboard";

// Error Boundary component
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: brown[500],
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
