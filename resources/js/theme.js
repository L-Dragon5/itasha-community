import { extendTheme } from '@chakra-ui/react';

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

export default theme;
