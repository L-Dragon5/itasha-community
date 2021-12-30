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
import { AiOutlineInstagram } from 'react-icons/ai';

import DataTable from '../Public/components/DataTable';
import AdminLayout from './AdminLayout';
import Button from './components/Button';
import UpdateGroupForm from './forms/UpdateGroupForm';

const Groups = ({ groups }) => {
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
  const [group, setGroup] = useState(null);
  const cancelRef = useRef();
  const { delete: inertiaDelete, processing } = useForm();

  const openGroupUpdate = (id) => {
    setGroup(groups.find((g) => g.id === id));
    onUpdateOpen();
  };

  const openGroupDelete = (id) => {
    setGroup(groups.find((v) => v.id === id));
    onDeleteOpen();
  };

  const onApprove = (id) => {
    Inertia.patch(`/groups/${id}/approve`, {
      onSuccess: () => {
        Inertia.reload({ only: ['groups'] });
      },
    });
  };

  const onDelete = () => {
    inertiaDelete(`/groups/${group.id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['groups'] });
      },
    });
  };

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
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
      Header: 'Exclusivity',
      accessor: (row) => {
        return (
          row.exclusivity.charAt(0).toUpperCase() + row.exclusivity.slice(1)
        );
      },
    },
    {
      Header: 'Notes',
      accessor: 'notes',
    },
    {
      Header: 'Social Media',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        return (
          <Link
            href={`https://instagram.com/${original.instagram}`}
            target="_blank"
          >
            <Icon as={AiOutlineInstagram} boxSize={7} />
          </Link>
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
              onClick={() => openGroupUpdate(original.id)}
              boxSize={7}
              cursor="pointer"
            />
            <DeleteIcon
              aria-label="Delete vehicle"
              onClick={() => openGroupDelete(original.id)}
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
        <DataTable columns={columns} data={groups} />
      </Flex>

      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Group Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateGroupForm g={group} onClose={onUpdateClose} />
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
              Delete Group
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this group? This action cannot be
              undone.
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

Groups.layout = (page) => <AdminLayout title="Groups">{page}</AdminLayout>;

export default Groups;
