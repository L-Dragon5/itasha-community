import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import SubmitVehicleForm from './forms/SubmitVehicleForm';

const Vehicles = ({ vehicles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TableView = () => {
    return useMemo(
      () => (
        <Table variant="striped" colorScheme="blue" size="lg">
          <Thead>
            <Tr>
              <Th>Vehicle Type</Th>
              <Th>Vehicle Info</Th>
              <Th>Series</Th>
              <Th>Character</Th>
              <Th>Location</Th>
              <Th>Designer</Th>
              <Th>Social Media</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehicles.map((v) => (
              <Tr key={v.id}>
                <Td textTransform="capitalize">{v.vehicle_type}</Td>
                <Td>{v.vehicle_information}</Td>
                <Td>{v.series}</Td>
                <Td>{v.character}</Td>
                <Td>
                  {[v.city, v.state, v.country].filter(Boolean).join(', ')}
                </Td>
                <Td>{v.designer}</Td>
                <Td>
                  {v.instagram && (
                    <Link
                      href={`https://instagram.com/${v.instagram}`}
                      target="_blank"
                    >
                      <Icon as={AiOutlineInstagram} boxSize={7} />
                    </Link>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ),
      [vehicles],
    );
  };

  return (
    <Flex flexGrow={1} maxWidth="full" direction="column">
      <Box overflow="auto" flexGrow={1}>
        <TableView />
      </Box>

      <Button
        h={20}
        w="full"
        borderRadius="none"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Vehicle
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Vehicle Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Help grow our database of itashas worldwide.</Text>
            <SubmitVehicleForm onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Text>
              Please wait for your submission to be added, all submissions are
              manually approved.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Vehicles.layout = (page) => <BaseLayout title="Vehicles">{page}</BaseLayout>;

export default Vehicles;
