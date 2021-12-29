import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React, { useMemo, useRef, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import AdminLayout from './AdminLayout';
import Button from './components/Button';
import UpdateVehicleForm from './forms/UpdateVehicleForm';

const Vehicles = ({ vehicles }) => {
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [vehicle, setVehicle] = useState(null);
  const cancelRef = useRef();
  const { delete: inertiaDelete, processing } = useForm();

  const openVehicleUpdate = (id) => {
    setVehicle(vehicles.find((v) => v.id === id));
    onUpdateOpen();
  };

  const openVehicleDelete = (id) => {
    setVehicle(vehicles.find((v) => v.id === id));
    onDeleteOpen();
  };

  const onDelete = () => {
    inertiaDelete(`/vehicles/${vehicle.id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['vehicles'] });
      },
    });
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
                  <DeleteIcon
                    aria-label="Delete vehicle"
                    onClick={() => openVehicleDelete(v.id)}
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

      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Vehicle Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateVehicleForm v={vehicle} onClose={onUpdateClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Vehicle
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this vehicle? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="outline" ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button onClick={onDelete} isLoading={processing} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

Vehicles.layout = (page) => <AdminLayout title="Vehicles">{page}</AdminLayout>;

export default Vehicles;
