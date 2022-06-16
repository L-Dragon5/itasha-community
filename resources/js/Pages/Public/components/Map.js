import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const Map = ({ center, zoom, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  return (
    <>
      <Box ref={ref} id="map" w="full" h="full" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Set the map prop on the child component.
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;
