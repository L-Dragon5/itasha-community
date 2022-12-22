import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React, { useMemo, useRef, useState } from 'react';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

import DataTable from '../Public/components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from '../Public/components/DataTableFilters';
import SocialMediaButton from '../Public/components/SocialMediaButton';
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
  const {
    isOpen: isPictureOpen,
    onOpen: onPictureOpen,
    onClose: onPictureClose,
  } = useDisclosure();
  const [curImagePath, setCurImagePath] = useState('');

  const openImage = (imgPath) => {
    setCurImagePath(imgPath);
    onPictureOpen();
  };
  const [vehicle, setVehicle] = useState(null);
  const cancelRef = useRef();
  const { delete: inertiaDelete, processing } = useForm();

  const openVehicleUpdate = (id) => {
    setVehicle(vehicles.find((v) => v._id === id));
    onUpdateOpen();
  };

  const openVehicleDelete = (id) => {
    setVehicle(vehicles.find((v) => v._id === id));
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
    inertiaDelete(`/vehicles/${vehicle._id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['vehicles'] });
      },
    });
  };

  const columns = useMemo(() => [
    {
      Header: 'Approval Status',
      accessor: (row) => {
        if (row.is_approved) {
          return 'Yes';
        }

        return 'No';
      },
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Image',
      id: 'image',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        if (original.cover_image) {
          return (
            <Image
              src={original.cover_image}
              onClick={() => openImage(original.cover_image)}
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
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Vehicle Information',
      accessor: 'vehicle_information',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Series',
      accessor: 'series',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Character',
      accessor: 'character',
      Filter: TextColumnFilter,
    },
    {
      Header: 'City',
      accessor: 'city',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'State/Province',
      accessor: 'state',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Country',
      accessor: 'country',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Designer',
      accessor: 'designer',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Social Media',
      Cell: (cellInfo) => {
        const { instagram, twitter } = cellInfo.row.original;
        return (
          <>
            {instagram && (
              <SocialMediaButton
                link={`https://instagram.com/${instagram}`}
                icon={AiOutlineInstagram}
              />
            )}

            {twitter && (
              <SocialMediaButton
                link={`https://twitter.com/${twitter}`}
                icon={AiOutlineTwitter}
              />
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
            {!original.is_approved && (
              <CheckIcon
                aria-label="Approve vehicle"
                onClick={() => onApprove(original._id)}
                boxSize={7}
                cursor="pointer"
              />
            )}

            <EditIcon
              aria-label="Edit vehicle"
              onClick={() => openVehicleUpdate(original._id)}
              boxSize={7}
              cursor="pointer"
            />
            <DeleteIcon
              aria-label="Delete vehicle"
              onClick={() => openVehicleDelete(original._id)}
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
        <DataTable columns={columns} data={vehicles} />
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

      <Modal isOpen={isPictureOpen} onClose={onPictureClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Image of Vehicle</ModalHeader>
          <ModalBody>
            <Image src={curImagePath} alt="Vehicle" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Vehicles.layout = (page) => <AdminLayout title="Vehicles">{page}</AdminLayout>;

export default Vehicles;
