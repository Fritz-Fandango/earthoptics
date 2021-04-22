import * as React from 'react';

// Material UI components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Component
import Title from '../Title/Title';

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = () => {
  return (
    <React.Fragment>
      <Title>Recent Soil Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Deposits;
