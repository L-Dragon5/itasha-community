import { ChakraProvider } from '@chakra-ui/provider';
import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import { render } from 'react-dom';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/*
  Extends the default theme used for Chakra UI.

  This is where we can set custom colors and styles for the theme.
  Most of the components use the `colorScheme` prop, so changing the colors
  here will automatically update the colors for the site.
*/
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Open Sans, sans-serif',
  },
  components: {
    Button: {
      variants: {
        navigation: {
          lineHeight: 'inherit',
          fontWeight: 'normal',
          height: 'auto',
          '&.active': {
            textDecoration: 'none',
            backgroundColor: 'teal.500',
          },
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'teal.500',
          },
        },
      },
    },
    Link: {
      variants: {
        navigation: {
          '&.active': {
            textDecoration: 'none',
            backgroundColor: 'teal.500',
          },
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'teal.500',
          },
        },
      },
    },
  },
  styles: {
    global: {
      '*::-webkit-scrollbar': {
        height: '10px',
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'brandNeutral',
      },
      '*::-webkit-scrollbar-thumb': {
        background: 'teal.600',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: 'tealAccent',
      },
    },
  },
});

createInertiaApp({
  resolve: (name) => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App {...props} />
      </ChakraProvider>,
      el,
    );

    /*
    Initializes the progress bar that shows up when trying to navigate to a
    page that takes awhile to get to.
    
    TODO: Increase size of progress bar and make it more noticeable.
  */
    InertiaProgress.init();
  },
});
