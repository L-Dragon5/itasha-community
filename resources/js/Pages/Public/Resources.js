import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Resources = () => (
  <Flex flexGrow={1} direction="column">
    <Heading>Resources</Heading>
    <Heading>Tutorials</Heading>
    <Heading>Media</Heading>
  </Flex>
);

Resources.layout = (page) => <BaseLayout title="Resources">{page}</BaseLayout>;

export default Resources;
