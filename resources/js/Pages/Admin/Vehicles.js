import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import DataTable from '../Public/components/DataTable';
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
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [approvalSelection, setApprovalSelection] = useState('unapproved');
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

  const onApprove = (id) => {
    Inertia.patch(`/vehicles/${id}/approve`, {
      onSuccess: () => {
        Inertia.reload({ only: ['vehicles'] });
      },
    });
  };

  const onDelete = () => {
    inertiaDelete(`/vehicles/${vehicle.id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['vehicles'] });
      },
    });
  };

  const ApprovalSelection = useMemo(
    () => () =>
      (
        <Select
          w="sm"
          onChange={(e) => setApprovalSelection(e.target.value)}
        >
          <option value="unapproved">Unapproved Only</option>
          <option value="approved">Approved Only</option>
          <option value="all">All</option>
        </Select>
      ),
    [],
  );

  useEffect(() => {
    switch (approvalSelection) {
      case 'unapproved': {
        setFilteredVehicles(vehicles.filter((v) => v.is_approved === 0));
        break;
      }
      case 'approved': {
        setFilteredVehicles(vehicles.filter((v) => v.is_approved === 1));
        break;
      }
      default: {
        setFilteredVehicles(vehicles);
        break;
      }
    }
  }, [approvalSelection]);

  const columns = useMemo(() => [
    {
      Header: 'Image',
      id: 'image',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        if (original.cover_image) {
          const imgPath = `/storage/${original.cover_image}`;
          return (
            <Image
              src={imgPath}
              onClick={() => openImage(imgPath)}
              alt="Vehicle"
              cursor="pointer"
            />
          );
        }

        return <></>;
      },
    },
    {
      Header: 'Vehicle Type',
      id: 'vehicle_type',
      accessor: (row) => {
        return (
          row.vehicle_type.charAt(0).toUpperCase() + row.vehicle_type.slice(1)
        );
      },
    },
    {
      Header: 'Vehicle Information',
      accessor: 'vehicle_information',
    },
    {
      Header: 'Series',
      accessor: 'series',
    },
    {
      Header: 'Character',
      accessor: 'character',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State/Province',
      accessor: 'state',
    },
    {
      Header: 'Country',
      accessor: 'country',
    },
    {
      Header: 'Designer',
      accessor: 'designer',
    },
    {
      Header: 'Social Media',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        return (
          <>
            {original.instagram && original.instagram !== '' && (
              <Link
                href={`https://instagram.com/${original.instagram}`}
                target="_blank"
              >
                <Icon as={AiOutlineInstagram} boxSize={7} />
              </Link>
            )}
          </>
        );
      },
    },
    {
      Header: 'Actions',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        return (
          <>
            {original.is_approved === 0 && (
              <CheckIcon
                aria-label="Approve vehicle"
                onClick={() => onApprove(original.id)}
                boxSize={7}
                cursor="pointer"
              />
            )}

            <EditIcon
              aria-label="Edit vehicle"
              onClick={() => openVehicleUpdate(original.id)}
              boxSize={7}
              cursor="pointer"
            />
            <DeleteIcon
              aria-label="Delete vehicle"
              onClick={() => openVehicleDelete(original.id)}
              boxSize={7}
              cursor="pointer"
            />
          </>
        );
      },
    },
  ]);

  return (
    <Flex flexGrow={1} maxWidth="full" direction="column">
      <Flex direction="column" overflow="auto" flexGrow={1} mb={3}>
        <DataTable
          columns={columns}
          data={filteredVehicles}
          headerButtons={<ApprovalSelection />}
        />
      </Flex>

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
