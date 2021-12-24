import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

const Button = ({ children, ...props }) => (
  <ChakraButton colorScheme="red" loadingText="Submitting" {...props}>
    {children}
  </ChakraButton>
);

export default Button;
