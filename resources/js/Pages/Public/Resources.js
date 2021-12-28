import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Resources = () => (
  <SimpleGrid p={3} flexGrow={1} columns={{ base: 2, lg: 3 }} p={3} spacing={3}>
    <Flex>
      <Heading textAlign="center" w="full">
        Tutorials
      </Heading>
    </Flex>
    <Flex>
      <Heading textAlign="center" w="full">
        Helpful Tools
      </Heading>
    </Flex>
    <Flex>
      <Heading textAlign="center" w="full">
        Media
      </Heading>
    </Flex>
  </SimpleGrid>
);

Resources.layout = (page) => <BaseLayout title="Resources">{page}</BaseLayout>;

export default Resources;
