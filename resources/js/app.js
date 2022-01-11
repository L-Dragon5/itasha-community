import { ChakraProvider } from '@chakra-ui/provider';
import { ColorModeScript } from '@chakra-ui/react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import { render } from 'react-dom';

import theme from './theme';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/*
  Load client-side inertia app.
*/

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
