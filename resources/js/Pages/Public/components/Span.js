import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

/*
  Recrete <span> element, but with support for Chakra props.
*/
const Span = ({ children, isBold, ...props }) => (
  <Box
    as="span"
    display="inline"
    marginLeft={1}
    fontWeight={isBold ? 700 : 300}
    {...props}
  >
    {children}
  </Box>
);

Span.propTypes = {
  children: PropTypes.node.isRequired,
  isBold: PropTypes.bool,
};

Span.defaultProps = {
  isBold: false,
};

export default Span;
