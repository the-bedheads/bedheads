import React, { useState, useEffect } from 'react';

import ReactMapGL, { NavigationControl } from 'react-map-gl';
import axios from 'axios';

const Map = (props: any) => {
  const [viewport, setViewport] = useState({
    latitude: 29.959021,
    longitude: -90.065285,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
  const { locationQuery } = props;

  const geocodeQuery = (query: string) => {
    axios.get(`/api/geocode/${query}`)
      .then((response) => {
        console.log('RESPONSE', response.data.features[0].center);
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

  return (
    <div className="mapbox-react">
      <ReactMapGL
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        width="500px"
        height="700px"
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
      </ReactMapGL>
    </div>
  );
};

export default Map;
