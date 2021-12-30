import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import AdminLayout from './AdminLayout';
import Button from './components/Button';

const Resources = () => (
  <SimpleGrid flexGrow={1} columns={{ base: 2, lg: 3 }} p={3} spacing={3}>
    <Flex direction="column">
      <Heading>Tutorials</Heading>
      <Button leftIcon={<AddIcon />}>Add Tutorial</Button>
    </Flex>
    <Flex direction="column">
      <Heading>Helpful Tools</Heading>
      <Button leftIcon={<AddIcon />}>Add Tool</Button>
    </Flex>
    <Flex direction="column">
      <Heading>Media</Heading>
      <Button leftIcon={<AddIcon />}>Add Media</Button>
    </Flex>
  </SimpleGrid>
);

Resources.layout = (page) => (
  <AdminLayout title="Resources">{page}</AdminLayout>
);

export default Resources;
