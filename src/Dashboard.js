import React from 'react';
import clsx from 'clsx';

// Material UI styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Material UI colors
import purple from '@material-ui/core/colors/purple';

// Material UI components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Components
// import useStyles from './styles/useStyles';
import Chart from './components/Chart/Chart';
import FooterDashboard from './components/FooterDashboard/FooterDashboard';
import DataKPI from './components/DataKPI/DataKPI';
import Header from './components/Header/Header';
import LeftNav from './components/LeftNav/LeftNav';
import Map from './components/Map/Map';
import DataTable from './components/DataTable/DataTable';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  primColor: {
    color: theme.palette.primary.main
  },
  secColor: {
    color: theme.palette.secondary.main
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  mapPaper: {
    height: '60vh',
  },
  mapboxContainer: {
    height: '80%',
  },
  purpleNurple: {
    color: theme.palette.getContrastText(purple[500]),
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  mapNavStyle: {
    position: 'absolute',
    top: 220,
    right: 0,
    padding: '20px'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const mapPaper = clsx(classes.paper, classes.mapPaper);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header classes={classes} handleDrawerOpen={handleDrawerOpen} open={open} />
      <LeftNav classes={classes} handleDrawerClose={handleDrawerClose} open={open} />
      {/*  Main content */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={mapPaper}>
                <Map classes={classes} />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <DataKPI />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DataTable />
              </Paper>
            </Grid>
          </Grid>
          <FooterDashboard />
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
