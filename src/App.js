// Material UI theme functions
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';

// Material UI colors
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';

// Dashboard component
import Dashboard from './Dashboard';

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
