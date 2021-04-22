import React, {
    useEffect,
    useState
} from 'react';
import ReactMapGL, {
    Marker,
    NavigationControl,
    Popup
} from 'react-map-gl';

// Mock data layer
import * as multipoint from '../../data/mockGeo.json';

// Material UI component
import IconButton from '@material-ui/core/IconButton';

// Material UI icon
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';

const Map = (props) => {
    const { classes } = props;

    const styleSettings = {
        minZoom: 10,
        maxZoom: 16,
    };

    // Set viewport state
    const [viewport, setViewport] = useState({
        latitude: 42.704868874031554,
        longitude: -92.65880554936408,
        height: '100vh',
        width: '67vw',
        zoom: 13
    });

    // Set point selection state
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Data layer didn't include unique identifiers
    let markerUniqId = require('uniqid')

    useEffect(() => {
        const keyboardListener = (evt) => {
            if(evt.key === "Escape") {
                setSelectedPoint(null);
            }
        };

        window.addEventListener('keydown', keyboardListener);

        return () => {
            window.removeEventListener('keydown', keyboardListener);
        };
    }, []);

    return (
        <ReactMapGL
            // Note: Be sure to add your local env var for the token.
            mapboxApiAccessToken={process.env.REACT_APP_SATELLITE_DATA_TOKEN}
            {...viewport}
            {...styleSettings}
            mapStyle='mapbox://styles/mapbox/satellite-v9' // Satellite
            onViewportChange={viewport => { setViewport(viewport) }}
        >
            <div className={classes.mapNavStyle}>
                <NavigationControl />
            </div>
            {multipoint.coordinates.map((coord) => (
                <Marker
                    key={markerUniqId('coord-')}
                    latitude={coord[0]}
                    longitude={coord[1]}
                >
                <IconButton
                    aria-label="data point"
                    className={classes.purpleNurple}
                    size="small"
                    onClick={evt => {
                        evt.preventDefault();
                        setSelectedPoint(coord);
                    }}
                >
                    <RoomTwoToneIcon />
                </IconButton>
                </Marker>
            ))}
            {selectedPoint ? (
                <Popup
                    latitude={selectedPoint[0]}
                    longitude={selectedPoint[1]}
                    onClose={() => setSelectedPoint(null)}
                >
                    <div>
                        <pre>{`lat: ${selectedPoint[0]}`}</pre>
                        <pre>{`log: ${selectedPoint[1]}`}</pre>
                    </div>
                </Popup>
            ) : null }
        </ReactMapGL>
    )
}

export default Map;
