import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Header from '../pages/navbar';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxPopover,
  ComboboxOption
} from '@reach/combobox';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 34.052235,
  lng: -118.243683
};

const options = {
  disableDefaultUI: true,
  zoomControl: false
};

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD5bfT1hqlXvLLnxrfMEeCGsK1NrhHYscM',
    libraries
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback(event => {

    <div>
Hello
    </div>;
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      }
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (

  <div>

    <Search panTo={panTo}/>
    <Locate panTo={panTo} />

     <GoogleMap
     mapContainerStyle={mapContainerStyle}
     zoom={10}
     center={center}
     options={options}
     onClick={onMapClick
    }
     onLoad={onMapLoad}
     >
       {markers.map(marker => (
       <Marker
       key={marker.time.toISOString()}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: './fries.jpeg',
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15)
        }}
           onClick={() => {
             setSelected(marker);
           }}
         />
       ))}
        {selected
          ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng } }

          >
          <div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat}%2C${selected.lng}`}>
                Get Directions
              </a>

          </div>
        </InfoWindow>)
          : null}
       </GoogleMap>
  </div>

  );
}

function Locate({ panTo }) {
  return <button className='locate' onClick={() => {
    navigator.geolocation.getCurrentPosition(position => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => null, options);
  }}>
    <img src="./compass.jpeg" alt="compass locate me" />
    </button>;
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 34.052235, lng: () => -118.243683 },
      radius: 200 * 1000
    }
  });

  return (
   <div className='search'>
  <Combobox
     onSelect={ async address => {
       setValue(address, false);
       clearSuggestions();

       try {
         const results = await getGeocode({ address });
         const { lat, lng } = await getLatLng(results[0]);
         panTo({ lat, lng });

       } catch (error) {

       }
     }}
  >
<ComboboxInput
 value={value}
 onChange={e => {
   setValue(e.target.value);
 }}
  disabled={!ready}
  placeholder="Enter an Address"
 />
  <ComboboxPopover className='white'>
    <ComboboxList>
   {status === 'OK' &&
    data.map(({ id, description }) => (
   <ComboboxOption key={id} value={description} />
    ))}
          </ComboboxList>
   </ComboboxPopover>
  </Combobox>

</div>
  );
}
