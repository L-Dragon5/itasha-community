import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

const Button = React.forwardRef(({ children, ...props }, ref) => (
  <ChakraButton
    ref={ref}
    colorScheme="blue"
    loadingText="Submitting"
    {...props}
  >
    {children}
  </ChakraButton>
));

export default Button;
