import React from "react";
import { useState } from 'react';
import PropTypes from "prop-types";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import Loading from "components/misc/Loading.jsx";

const VitebskLatLong = { lat: 55.2047, lng: 30.2086 };
const Vitebsk2LatLong = { lat: 55.25, lng: 30.3 };

const CustomSkinMap = withScriptjs(
  withGoogleMap( /*props*/ () => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={VitebskLatLong}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker position={VitebskLatLong} />
      <Marker position={Vitebsk2LatLong} />
    </GoogleMap>
  ))
);


const _fetchGoogleMapApiKey = (callback) =>
{
  let route = window.location.origin;
  route += '/api/config/processenv?name=RSIS_GOOGLE_API_KEY';

  fetch(route)
    .then( response => response.json())  // '{}'
    .then( env => {
      //console.log('env.value: ', env.value);
      callback(env.value);
    })
  .catch(err => {
    console.log(err); 
  });    
};

/*
async function _fetchGoogleMapApiKey(callback)
{
  let route = window.location.origin;
  route += '/api/config/processenv?name=RSIS_GOOGLE_API_KEY';
  try {
    console.log('route: ', route);
    let response = await fetch(route);
    let env = await response.json();
    console.log('env.value: ', env.value);
    callback(env.value);
  } 
  catch( err ) {
    console.log(err); 
  }
}
*/

// eslint-disable-next-line no-unused-vars
function Maps({ ...props }) 
{
  //console.log('props: ', props);
  const [gmapApiKey, setApiKey] = useState('');
  if(!gmapApiKey) {
    _fetchGoogleMapApiKey(setApiKey);    
  }

  const url = 'https://maps.googleapis.com/maps/api/js?key='+gmapApiKey;
  //console.log(url);
  
  return gmapApiKey !== '' ? (
    <CustomSkinMap
      googleMapURL={url}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  ) : ( 
    <Loading /> 
  );
}

Maps.propTypes = {
  gmapApiKey : PropTypes.string
};

export default Maps;
