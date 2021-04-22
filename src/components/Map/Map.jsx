import React, {
  useRef,
  useEffect,
  useState
} from 'react';
import mapboxgl from 'mapbox-gl';

// Material UI styles
import { useTheme } from '@material-ui/core/styles';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Components
import Title from '../Title/Title';

const Map = (props) => {
  const theme = useTheme();

  // mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
  mapboxgl.accessToken = 'pk.eyJ1Ijoia3prdiIsImEiOiI5QTV5TzdVIn0.upR1M0jGXbQPvkte-SaQ1w';

  const mockGeoJSON = 'https://gxlu1hg02b.execute-api.us-east-1.amazonaws.com/default/mockGeoJSONAPI';

  const tilesURL = 'https://tiles.earthoptics.com/ndvi/{z}/{x}/{y}.png';

  const mapContainerRef = useRef(null);

  const [long, setLong] = useState(-92.65880554936408);

  const [lati, setLati] = useState(42.704868874031554);

  const [zoom, setZoom] = useState(13);

  // Initialize map when component mounts
  useEffect(() => {
      const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [long, lati],
          zoom: zoom
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('move', () => {
          setLati(map.getCenter().lati);
          setLong(map.getCenter().long);
          setZoom(map.getZoom());
      });

      // Clean up on map unmount
      return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Title>Today</Title>
      <div>
        <div className='sidebarStyle'>
          <div>
            <Typography>Longitude: {long} | Latitude: {lati} | Zoom: {zoom}</Typography>
          </div>
        </div>
        <div className='map-container' ref={mapContainerRef} />
      </div>
    </React.Fragment>
  );
}

export default Map;
