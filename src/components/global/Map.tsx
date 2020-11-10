import React, { useState, useEffect, useCallback } from 'react';

import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import axios from 'axios';

const Map = (props: any) => {
  const [viewport, setViewport] = useState({
    latitude: 29.959021,
    longitude: -90.065285,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
  const { locationQuery, listings } = props;
  const [listingMarkers, setListingMarkers] = useState([]);

  const getMarkers = useCallback(() => {
    const markerCollector: any = [];
    if (listings.length) {
      listings.forEach((listing: any) => {
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
      <div className="mapbox-react">
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
      </div>
    );
  }
  return (
    <>
    </>
  );
};

export default Map;
