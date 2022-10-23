// import React from 'react';
// import {
//  GoogleMap,
//  useLoadScript,
//  Marker,
//  InfoWindow
// } from '@react-google-maps/api';
//
// import usePlacesAutocomplete, {
//  getGeocode,
//  getLatLng
// } from 'use-places-autocomplete';
//
// import {
//  Combobox,
//  ComboboxInput,
//  ComboboxList,
//  ComboboxPopover,
//  ComboboxOption
// } from '@reach/combobox';
//
// const libraries = ['places'];
// const mapContainerStyle = {
//  width: '100vw',
//  height: '100vh'
// };
// const center = {
//  lat: 34.052235,
//  lng: -118.243683
// };
//
// const options = {
//  disableDefaultUI: true,
//  zoomControl: false
// };
//
// export default function Map(props) {
//  const { isLoaded, loadError } = useLoadScript({
//    googleMapsApiKey: 'AIzaSyD5bfT1hqlXvLLnxrfMEeCGsK1NrhHYscM',
//    libraries
//  });
//  const [markers, setMarkers] = React.useState([]);
//  const [selected, setSelected] = React.useState(null);
//
//  const onMapClick = React.useCallback(event => {
//
//    <div>
// Hello
//    </div>;
//    setMarkers(current => [
//      ...current,
//      {
//        lat: event.latLng.lat(),
//        lng: event.latLng.lng(),
//        time: new Date()
//      }
//    ]);
//  }, []);
//
//  const mapRef = React.useRef();
//  const onMapLoad = React.useCallback(map => {
//    mapRef.current = map;
//  }, []);
//
//  const panTo = React.useCallback(({ lat, lng }) => {
//    mapRef.current.panTo({ lat, lng });
//    mapRef.current.setZoom(18);
//  }, []);
//
//  React.useEffect(() => {
//    fetch('/users')
//      .then(response => response.json())
//      .then(markers => {
//        setMarkers(markers);
//      });
//  }, []);
//
//  if (loadError) return 'Error loading maps';
//  if (!isLoaded) return 'Loading Maps';
//
//  return (
//
//  <div>
//
//    <Search panTo={panTo}/>
//    <Locate panTo={panTo} />
//
//     <GoogleMap
//     mapContainerStyle={mapContainerStyle}
//     zoom={10}
//     center={center}
//     options={options}
//     onClick={onMapClick
//    }
//     onLoad={onMapLoad}
//     >
//       {markers.map(marker => (
//       <Marker
//       key={marker.time.toISOString()}
//        position={{ lat: marker.lat, lng: marker.lng }}
//        icon={{
//          url: './fries.jpeg',
//          scaledSize: new window.google.maps.Size(30, 30),
//          origin: new window.google.maps.Point(0, 0),
//          anchor: new window.google.maps.Point(15, 15)
//        }}
//           onClick={() => {
//             setSelected(marker);
//           }}
//         />
//       ))}
//        {selected
//          ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng } }
//
//          >
//          <div>
//              <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat}%2C${selected.lng}`}>
//                Get Directions
//              </a>
//
//          </div>
//        </InfoWindow>)
//          : null}
//       </GoogleMap>
//  </div>
//
//  );
// }
//
// function Locate({ panTo }) {
//  return <button className='locate' onClick={() => {
//    navigator.geolocation.getCurrentPosition(position => {
//      panTo({
//        lat: position.coords.latitude,
//        lng: position.coords.longitude
//      });
//    }, () => null, options);
//  }}>
//    <img src="./compass.jpeg" alt="compass locate me" />
//    </button>;
// }
//
// function Search({ panTo }) {
//  const {
//    ready,
//    value,
//    suggestions: { status, data },
//    setValue,
//    clearSuggestions
//  } = usePlacesAutocomplete({
//    requestOptions: {
//      location: { lat: () => 34.052235, lng: () => -118.243683 },
//      radius: 200 * 1000
//    }
//  });
//
//  return (
//   <div className='search'>
//  <Combobox
//     onSelect={ async address => {
//       setValue(address, false);
//       clearSuggestions();
//
//       try {
//         const results = await getGeocode({ address });
//         const { lat, lng } = await getLatLng(results[0]);
//         panTo({ lat, lng });
//
//       } catch (error) {
//
//       }
//     }}
//  >
// <ComboboxInput
// value={value}
// onChange={e => {
//   setValue(e.target.value);
// }}
//  disabled={!ready}
//  placeholder="Enter an Address"
// />
//  <ComboboxPopover className='white'>
//    <ComboboxList>
//   {status === 'OK' &&
//    data.map(({ id, description }) => (
//   <ComboboxOption key={id} value={description} />
//    ))}
//          </ComboboxList>
//   </ComboboxPopover>
//  </Combobox>
//
// </div>
//  );
// }
//
import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

export default function PinMap(props) {
  // Check if there is a user logged in, if not, redirect to registration page:
  // const validUser = React.useContext(AppContext);
  // if (!validUser.user) return <Redirect to='registration' />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD5bfT1hqlXvLLnxrfMEeCGsK1NrhHYscM'
  });

  // Set infoWindow state to marker location or null, to toggle info window:
  const [infoWindow, setInfoWindow] = React.useState(null);

  // Prevent re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  // Get coordinates from props:
  const center = { lat: props.lat, lng: props.lng };
  console.log(props.lat);
  // Use Geolocation to Locate the user for targeting via a button:
  function GeoLocate({ panTo }) {
    return (
      <button type='button' onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          panTo({
            lat: position.coords.latitude, lng: position.coords.longitude
          });
        }, () => null);
      }}>
        <img className='target sec-bk-color pin-pg'
          src='/target-audience.png'
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
          mapContainerClassName='pin-map'
          zoom={17}
          center={center}
          onLoad={onMapLoad}
        >

          <GeoLocate panTo={panTo} />

          <Marker position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: '/pt_pin_sm.png',
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 40)
            }}
            onClick={() => {
              setInfoWindow({ center });
            }}
          />

          {infoWindow
            ? (
              <InfoWindow
                position={{ lat: center.lat, lng: center.lng }}
                onCloseClick={() => { setInfoWindow(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <a href={`#pins?postId=${props.spotId}`}>
                      <img className='info-img' src={props.img}></img>
                    </a>
                  </div>
                  <p className='text-center dir-link pt-1'>
                    <a href={
                      `https://www.google.com/maps/search/?api=1&query=${center.lat}%2C${center.lng}`
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

    </>
  );
}
