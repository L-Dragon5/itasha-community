import { ChakraProvider } from '@chakra-ui/provider';
import { ColorModeScript } from '@chakra-ui/react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import createServer from '@inertiajs/server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import theme from './theme';

/*
  Load server-side inertia app.
*/
createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => require(`./Pages/${name}`),
    setup: ({ App, props }) => (
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App {...props} />
      </ChakraProvider>
    ),
  }),
);
