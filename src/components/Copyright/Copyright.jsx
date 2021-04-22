import * as React from 'react';

// Material UI components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`Copyright © Martín Moreno for `}
        <Link color="inherit" href="https://earthoptics.com/">EarthOptics</Link>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}

export default Copyright;
