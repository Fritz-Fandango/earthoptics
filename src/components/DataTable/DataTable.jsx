import * as React from 'react';

// Mock data layer
import * as multipoint from '../../data/mockGeo.json';

// Material UI components
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Components
import Title from '../Title/Title';

function preventDefault(event) {
  event.preventDefault();
}


const DataTable = () => {
  // Data layer didn't include unique identifiers
  let markerUniqId = require('uniqid');

  const coordinates = multipoint.coordinates.splice(0, 15);

  return (
    <React.Fragment>
      <Title>GEO JSON Data Points</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Point</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell align="right">Co-ordinates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {coordinates.map((point, idx) => (
          <TableRow key={markerUniqId('coord-')}>
            <TableCell>{++idx}</TableCell>
            <TableCell>{point[0]}</TableCell>
            <TableCell>{point[1]}</TableCell>
            <TableCell align="right">{`(${point[0]}, ${point[1]})`}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more data points
      </Link>
    </React.Fragment>
  );
}

export default DataTable;
