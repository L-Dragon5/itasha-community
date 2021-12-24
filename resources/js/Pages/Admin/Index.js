import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import AdminLayout from './AdminLayout';

const Index = () => (
  <Flex flexGrow={1} direction="column">
    <Flex
      p={4}
      h={400}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="2xl" textAlign="center">
        Audit Log
      </Heading>
      <Heading as="h2" size="lg" textAlign="center">
        The starting point
      </Heading>
    </Flex>
  </Flex>
);

Index.layout = (page) => <AdminLayout title="Home">{page}</AdminLayout>;

export default Index;
