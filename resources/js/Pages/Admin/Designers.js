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
  useDisclosure,
} from '@chakra-ui/react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React, { useMemo, useRef, useState } from 'react';
import { AiOutlineGlobal, AiOutlineInstagram } from 'react-icons/ai';

import DataTable from '../Public/components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from '../Public/components/DataTableFilters';
import AdminLayout from './AdminLayout';
import Button from './components/Button';
import UpdateDesignerForm from './forms/UpdateDesignerForm';

const Designers = ({ designers }) => {
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
  const [designer, setDesigner] = useState(null);
  const cancelRef = useRef();
  const { delete: inertiaDelete, processing } = useForm();

  const openDesignerUpdate = (id) => {
    setDesigner(designers.find((d) => d.id === id));
    onUpdateOpen();
  };

  const openDesignerDelete = (id) => {
    setDesigner(designers.find((v) => v.id === id));
    onDeleteOpen();
  };

  const onApprove = (id) => {
    Inertia.patch(`/designers/${id}/approve`, {
      onSuccess: () => {
        Inertia.reload({ only: ['designers'] });
      },
    });
  };

  const onDelete = () => {
    inertiaDelete(`/designers/${designer.id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['designers'] });
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
      Header: 'Name',
      accessor: 'name',
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
      Header: 'Contact',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        return (
          <>
            {original.website && original.website !== '' && (
              <Link href={original.website} target="_blank">
                <Icon as={AiOutlineGlobal} boxSize={7} />
              </Link>
            )}

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
                aria-label="Approve designer"
                onClick={() => onApprove(original.id)}
                boxSize={7}
                cursor="pointer"
              />
            )}

            <EditIcon
              aria-label="Edit designer"
              onClick={() => openDesignerUpdate(original.id)}
              boxSize={7}
              cursor="pointer"
            />
            <DeleteIcon
              aria-label="Delete designer"
              onClick={() => openDesignerDelete(original.id)}
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
        <DataTable columns={columns} data={designers} />
      </Flex>

      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Designer Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateDesignerForm d={designer} onClose={onUpdateClose} />
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
              Delete Designer
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this designer? This action cannot
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

Designers.layout = (page) => (
  <AdminLayout title="Designers">{page}</AdminLayout>
);

export default Designers;
