import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Resources = () => (
  <SimpleGrid flexGrow={1} columns={{ base: 2, lg: 3 }} p={3} spacing={3}>
    <Flex>
      <Heading>Tutorials</Heading>
    </Flex>
    <Flex>
      <Heading>Helpful Tools</Heading>
    </Flex>
    <Flex>
      <Heading>Media</Heading>
    </Flex>
  </SimpleGrid>
);

Resources.layout = (page) => <BaseLayout title="Resources">{page}</BaseLayout>;

export default Resources;
