import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Designers = () => (
  <Flex flexGrow={1} direction="column">
    <Heading>Designers</Heading>
    <Heading>Submit Designer</Heading>
  </Flex>
);

Designers.layout = (page) => <BaseLayout title="Designers">{page}</BaseLayout>;

export default Designers;
