import { useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/Marker";

const WorldMap = ({ center, zoom }) => {
  const [markers, setMarkers] = useState([]);

  console.log(import.meta.env);

  const handleLocation = ({ lat, lng }) => {
    console.log("map is clicked");

    const newMarker = {
      id: Date.now(),
      position: { lat, lng },
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={handleLocation}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              lat={marker.position.lat}
              lng={marker.position.lng}
            />
          );
        })}
        <Marker />
      </GoogleMapReact>
    </div>
  );
};

WorldMap.defaultProps = {
  center: {
    lat: 41.6086,
    lng: 21.7453,
  },
  zoom: 7,
};

WorldMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number,
};

export default WorldMap;
