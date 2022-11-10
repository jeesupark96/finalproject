import React from 'react';
import { Tooltip, OverlayTrigger, Container, Row } from 'react-bootstrap';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '50vw',
  height: '50vh'
};

export default function MapDetails(props) {
  // Check for online status of the browser, if offline, send error message:
  const [spots, setSpots] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/spots')
      .then(response => response.json())
      .then(spots => {
        setSpots(spots);
      });
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD5bfT1hqlXvLLnxrfMEeCGsK1NrhHYscM'
  });

  /* Establish starting coordinates, use useMemo hook to prevent rerendering on
  click: */
  const center = React.useMemo(() => ({ lat: 34.0522, lng: -118.2437 }), []);
  /* Set map options to add custom style and limit points of interest on map
  (fullscreen not supported on iOS): */
  const options = React.useMemo(() => ({
    mapId: '8c7ace9f28d909f0',
    clickableIcons: false,
    fullscreenControl: true
  }), []);

  // Prevent re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // If there is an error loading the Google Map, display error message:
  if (loadError) {
    return (
      <Container>
        <Row className='text-center'>
          <h2 className='pri-color display-3 fw-bold mt-5 '>
            Error Loading Map
          </h2>
        </Row>
        <Row>
          <p className='err-text msg-font fw-bold pt-5 px-4'>
            Sorry, something&apos;s not right here. Please try the following:
          </p>

          <ul className='pt-2 px-4'>
            <li>
              Check your internet connection and try again.
            </li>
            <li>
              Refresh the page, this might help.
            </li>
            <li>
              Try signing out and signing back in again.
            </li>
            <li>
              If this problem persists, please contact us at&nbsp;
              <a href="mailto:citycanvashelpers@gmail.com">
                CityCanvasHelpers@gmail.com
              </a>
            </li>
          </ul>
        </Row>
      </Container>
    );
  }

  console.log(props);
  if (isLoaded) {
    return (

      <div className='form-map-cont sec-border'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={{ lat: +props.position.lat, lng: +props.position.lng }}
          onLoad={onMapLoad}
          options={options}
        >

            <Marker
              key={props.spotId}
              position={{ lat: +props.position.lat, lng: +props.position.lng }}
              icon={{
                url: './fries.jpeg',
                scaledSize: new window.google.maps.Size(45, 45),
                anchor: new window.google.maps.Point(22, 30)
              }}
              onClick={() => {

                setSelected(spots);
                console.log(selected);
              }}
            />

              <InfoWindow
                position={{ lat: +props.position.lat, lng: +props.position.lng }}
                onCloseClick={() => { setSelected(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <h1>{props.name}</h1>
                    <a href={`#spots?spotId=${props.spotId}`}>

                      <h1>{props.eventName}</h1>
                      <img
                        className='info-img'
                        src={props.photoFile}
                      ></img>
                    </a>
                  </div>
                  <p className='text-center dir-link pt-1'>
                    <a href={
                      `https://www.google.com/maps/search/?api=1&query=${+props.position.lat}%2C${+props.position.lng}`
                    }>
                      Get Directions
                    </a>
                  </p>
                </div>
              </InfoWindow>

        </GoogleMap>
      </div>
    );

  } else return 'hello';

}
