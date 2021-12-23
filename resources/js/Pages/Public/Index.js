import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Index = () => (
  <Flex flexGrow={1} direction="column">
    <Heading>Welcome</Heading>
    <Heading>Featured Itasha of the Day</Heading>
  </Flex>
);

Index.layout = (page) => <BaseLayout title="Home">{page}</BaseLayout>;

export default Index;
