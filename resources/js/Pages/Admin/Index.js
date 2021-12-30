import { Box, Flex, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

import AdminLayout from './AdminLayout';

const Index = ({ audits }) => (
  <Flex p={4} flexGrow={1} direction="column" alignItems="center">
    <Heading as="h1" size="2xl" textAlign="center" mb={3}>
      Audit Log
    </Heading>
    <Box h="full" overflow="auto">
      <UnorderedList>
        {audits.map((audit) => (
          <ListItem
            key={audit.id}
            cursor="pointer"
            onClick={() =>
              alert(
                `Old values: ${JSON.stringify(audit.old_values)}\n` +
                  `New values: ${JSON.stringify(audit.new_values)}`,
              )
            }
          >
            {audit.auditable_type} of ID: {audit.auditable_id} was {audit.event}{' '}
            at{' '}
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'long',
            }).format(new Date(audit.created_at))}{' '}
            (IP: {audit.ip_address})
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  </Flex>
);

Index.layout = (page) => <AdminLayout title="Home">{page}</AdminLayout>;

export default Index;
