import React from 'react';
import { Navbar } from 'react-bootstrap';
// import AppContext from '../lib/app-context';
// import Redirect from '../components/redirect';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

const center = { lat: 34.0522, lng: -118.2437 };

export default function SpotFinder(props) {
  // // Check if there is a user logged in, if not, redirect to registration page:
  // const validUser = React.useContext(AppContext);
  // if (!validUser.user) return <Redirect to='registration' />;
//
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD5bfT1hqlXvLLnxrfMEeCGsK1NrhHYscM'
  });

  const [spots, setSpots] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  // Prevent re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // Fetch all the pins and and set them as markers in state:
  React.useEffect(() => {
    fetch('/api/spots')
      .then(response => response.json())
      .then(spots => {
        setSpots(spots);
      });
  }, []);

  // Use Geolocation to Locate the user for targeting via a button:
  function GeoLocate({ panTo }) {
    return (
      <button type='button' onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          panTo({
            lat: spots.latitude, lng: position.coords.longitude
          });
        }, () => null);
      }}>
        <img
          className='target sec-bk-color pin-pg'
          src='../public/compass.jpeg'
          alt='Target my location!'
        />
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map, one moment...';

  return (
    <>
      <div>
        <GoogleMap
          mapContainerClassName='map'
          zoom={10}
          center={center}
          onLoad={onMapLoad}
        >

          <GeoLocate panTo={panTo} />

          {spots.map(spots => (
            <Marker
              key={spots.spotId}
              position={{ lat: +spots.lat, lng: +spots.lng }}
              icon={{
                url: './fries.jpeg',
                scaledSize: new window.google.maps.Size(45, 45),
                anchor: new window.google.maps.Point(22, 30)
              }}
              onClick={() => {
                setSelected(spots);
              }}
            />
          ))}

          {selected
            ? (
              <InfoWindow
                position={{ lat: +selected.lat, lng: +selected.lng }}
                onCloseClick={() => { setSelected(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <a href={`#spots?spotId=${selected.spotId}`}>
                      <h1>{selected.firstName}</h1>
                      <h1>{selected.eventName}</h1>
                      <img
                        className='info-img'
                        src={selected.photoFile}
                      ></img>
                    </a>
                  </div>
                  <p className='text-center dir-link pt-1'>
                    <a href={
                      `https://www.google.com/maps/search/?api=1&query=${+selected.lat}%2C${+selected.lng}`
                    }>
                      Get Directions
                    </a>
                  </p>
                </div>
              </InfoWindow>
              )
            : null}
        </GoogleMap>
      </div>

      <Navbar fixed='bottom' className='fluid btm-brdr pri-bk-color'></Navbar>
    </>
  );
}
