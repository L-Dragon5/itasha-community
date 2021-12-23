import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import SubmitVehicleForm from './forms/SubmitVehicleForm';

const Vehicles = ({ vehicles }) => {
  const TableView = () => {
    return useMemo(
      () => (
        <Table variant="striped">
          <TableCaption>
            List of known itasha vehicles (alphabetical by series)
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Vehicle Type</Th>
              <Th>Vehicle Info</Th>
              <Th>Series</Th>
              <Th>Character</Th>
              <Th>Location</Th>
              <Th>Designer</Th>
              <Th>
                <Icon as={AiOutlineInstagram} boxSize={7} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehicles.map((v) => (
              <Tr key={v.id}>
                <Td textTransform="capitalize">{v.vehicle_type}</Td>
                <Td>{v.vehicle_information}</Td>
                <Td>{v.series}</Td>
                <Td>{v.character}</Td>
                <Td>{`${v.city}, ${v.state}, ${v.country}`}</Td>
                <Td>{v.designer}</Td>
                <Td>{v.instagram}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ),
      [vehicles],
    );
  };

  return (
    <Grid gap={4} templateRows="3fr 1fr" maxWidth="full">
      <GridItem overflow="auto">
        <Heading>Itasha Map</Heading>
        <Box overflow="auto">
          <TableView />
        </Box>
      </GridItem>
      <GridItem backgroundColor="gray.50" borderRadius="base" p={2}>
        <Heading as="h2" size="lg">
          Submit Vehicle
        </Heading>
        <Text>Help grow our database of itashas worldwide</Text>
        <SubmitVehicleForm />
      </GridItem>
    </Grid>
  );
};

Vehicles.layout = (page) => <BaseLayout title="Vehicles">{page}</BaseLayout>;

export default Vehicles;
