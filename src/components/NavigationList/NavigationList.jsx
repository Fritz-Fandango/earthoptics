import React from 'react';

// Material UI Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material UI Icons
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import MapIcon from '@material-ui/icons/Map';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function NavigationList(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tilling" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Compaction" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon  />
                    </ListItemIcon>
                    <ListItemText primary="Soil Health Insights" />
                </ListItem>
            </List>
        </div>
    )
};
