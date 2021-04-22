import React from 'react';

// Material UI Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

// Material UI Icon
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function ReportsList(props) {
  const { classes } = props;

  return (
    <div className={`${classes.root} ${classes.secColor}`}>
      <List>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Current month" color="secondary" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Year-end to date" />
        </ListItem>
      </List>
    </div>
  )
};
