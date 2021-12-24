import { EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import AdminLayout from './AdminLayout';
import UpdateVehicleForm from './forms/UpdateVehicleForm';

const Vehicles = ({ vehicles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vehicle, setVehicle] = useState(null);

  const openVehicleUpdate = (id) => {
    setVehicle(vehicles.find((v) => v.id === id));
    onOpen();
  };

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
              <Th>Actions</Th>
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
                <Td>
                  <EditIcon
                    aria-label="Edit vehicle"
                    onClick={() => openVehicleUpdate(v.id)}
                    boxSize={7}
                    cursor="pointer"
                  />
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
      <TableView />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Vehicle Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateVehicleForm v={vehicle} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Vehicles.layout = (page) => <AdminLayout title="Vehicles">{page}</AdminLayout>;

export default Vehicles;
