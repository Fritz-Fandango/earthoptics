import * as React from 'react';
import clsx from 'clsx';

// Material UI components
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// Components
import NavigationList from '../NavigationList/NavigationList';
import ReportsList from '../ReportsList/ReportsList';

const LeftNav = (props) => {
    const { classes, handleDrawerClose, open } = props;

    return (
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <NavigationList classes={classes} />
            <Divider />
            <ReportsList classes={classes} />
        </Drawer>
    )
}

export default LeftNav;
