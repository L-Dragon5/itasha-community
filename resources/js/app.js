import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme } from '@chakra-ui/react';
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
  colors: {
    brandPrimary: {
      50: '#d6f2f4',
      100: '#aee5e9',
      200: '#86d8de',
      300: '#5ecbd3',
      400: '#36bec8',
      500: '#3FC1CB',
      600: '#2b98a0',
      700: '#207278',
      800: '#154c50',
      900: '#0a2628',
    },
    brandPrimaryDark: '#003146',
    brandPrimaryAccent: '#F6861F',
    brandSecondary: '#FDB714',
    brandNeutral: '#BCBEC0',
    brandOrange: '#F47800',
    brandGreen: '#32CD32',
  },
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
            backgroundColor: 'brandPrimary.600',
          },
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'brandPrimary.600',
          },
        },
        resourcesSubNavigation: {
          color: '#ccc',
          height: '100%',
          '&.active': {
            color: 'black',
            borderBottomWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'brandPrimary.500',
          },
          _hover: {
            color: 'black',
            borderBottomWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'brandPrimary.500',
          },
        },
      },
    },
    Link: {
      variants: {
        navigation: {
          '&.active': {
            textDecoration: 'none',
            backgroundColor: 'brandPrimary.600',
          },
          _hover: {
            textDecoration: 'none',
            backgroundColor: 'brandPrimary.600',
          },
        },
        settingsSubNavigation: {
          '&.active': {
            fontWeight: '700',
            '& > p': {
              borderBottom: '1px solid black',
            },
          },
          _hover: {
            fontWeight: '700',
            textDecoration: 'none',
            '& > p': {
              borderBottom: '1px solid black',
            },
          },
        },
        portfolioSubNavigation: {
          '& > p': {
            borderBottomWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'black',
          },
          '&.active': {
            '& > p': {
              borderColor: 'brandPrimary.500',
            },
          },
          _hover: {
            textDecoration: 'none',
            '& > p': {
              borderColor: 'brandPrimary.600',
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      '*::-webkit-scrollbar': {
        height: '6px',
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'brandNeutral',
      },
      '*::-webkit-scrollbar-thumb': {
        background: 'brandPrimary.600',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: 'brandPrimaryAccent',
      },
    },
  },
});

createInertiaApp({
  resolve: (name) => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <ChakraProvider resetCSS theme={theme}>
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
