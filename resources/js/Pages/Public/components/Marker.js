import { useEffect, useState } from 'react';

const Marker = ({ info, ...options }) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // Remove marker from map on unmount.
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  if (marker) {
    let contentString;
    if (info.type === 'vehicle') {
      contentString =
        `<div id="content">` +
        `<strong style="text-transform: capitalize;">${info.vehicle_type} - ${info.vehicle_information}</strong><br>` +
        `<strong>Series:</strong> ${info.series}<br>` +
        `<strong>Character:</strong> ${info.character}<br>${
          info.instagram
            ? `<strong>Instagram:</strong> ${info.instagram}<br>`
            : ''
        }${
          info.cover_image
            ? `<img src="/storage/${info.cover_image}" style="width: 200px;"/>`
            : ''
        }</div>`;
    } else if (info.type === 'group' || info.type === 'designer') {
      contentString =
        `<div id="content">` +
        `<strong style="text-transform: capitalize;">${info.type} - ${
          info.name
        }</strong><br>${
          info.instagram
            ? `<strong>Instagram:</strong> ${info.instagram}<br>`
            : ''
        }</div>`;
    }

    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        shouldFocus: false,
      });
    });
  }

  return null;
};

export default Marker;
