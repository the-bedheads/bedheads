import React, { useState, useEffect, useCallback } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import axios from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: '-webkit-sticky',
    // position: 'sticky',
    maxWidth: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

interface SearchProps {
  locationQuery: string;
  listings: [];
}

const Map: React.FC<SearchProps> = ({ locationQuery, listings }) => {
  const [viewport, setViewport] = useState({
    latitude: 29.959021,
    longitude: -90.065285,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
  const [listingMarkers, setListingMarkers] = useState([]);

  const classes = useStyles();

  const getMarkers = useCallback(() => {
    const markerCollector: any = [];
    if (listings.length) {
      listings.forEach((listing: {latitude: string, longitude: string}) => {
        const { latitude, longitude } = listing;
        const location = {
          latitude: Number(latitude),
          longitude: Number(longitude),
        };
        markerCollector.push(location);
      });
    }
    setListingMarkers(markerCollector);
  }, [listings]);

  useEffect(() => {
    getMarkers();
  }, [listings, getMarkers]);

  const geocodeQuery = (query: string) => {
    axios.get(`/map/api/geocode/${query}`)
      .then((response) => {
        setViewport({
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
          zoom: 12,
          bearing: 0,
          pitch: 0,
        });
      });
  };

  useEffect(() => {
    if (locationQuery.length) {
      geocodeQuery(locationQuery);
    }
  }, [locationQuery]);

  if (listings.length) {
    return (
      <Grid className={classes.root} item xs={5}>
        <ReactMapGL
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          width="500px"
          height="500px"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={(nextViewport: React.SetStateAction<
          { latitude: number;
            longitude: number;
            zoom: number;
            bearing: number;
            pitch: number; }>) => setViewport(nextViewport)}
        >
          <div style={{ position: 'absolute', right: 10, top: 10 }}>
            <NavigationControl
              onViewportChange={(nextViewport: React.SetStateAction<
              { latitude: number;
                longitude: number;
                zoom: number;
                bearing: number;
                pitch: number; }>) => setViewport(nextViewport)}
            />
          </div>
          {listingMarkers.map((listing) => {
            const { latitude, longitude } = listing;
            return <Marker className="map-marker" latitude={latitude} longitude={longitude} />;
          })}
        </ReactMapGL>
      </Grid>
    );
  }
  return (
    <Grid className="mapbox-react" item xs={5} />
  );
};

export default Map;
