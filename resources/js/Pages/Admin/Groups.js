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
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { BsDiscord, BsMessenger } from 'react-icons/bs';

import DataTable from '../Public/components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from '../Public/components/DataTableFilters';
import SocialMediaButton from '../Public/components/SocialMediaButton';
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
    setGroup(groups.find((g) => g._id === id));
    onUpdateOpen();
  };

  const openGroupDelete = (id) => {
    setGroup(groups.find((v) => v._id === id));
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
    inertiaDelete(`/groups/${group._id}`, {
      onSuccess: () => {
        onDeleteClose();
        Inertia.reload({ only: ['groups'] });
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
      Header: 'Exclusivity',
      accessor: (row) => {
        return (
          row.exclusivity.charAt(0).toUpperCase() + row.exclusivity.slice(1)
        );
      },
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Notes',
      accessor: 'notes',
    },
    {
      Header: 'Social Media',
      Cell: (cellInfo) => {
        const { instagram, twitter, fb_chat, fb_group, discord } =
          cellInfo.row.original;
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

            {fb_chat && <SocialMediaButton link={fb_chat} icon={BsMessenger} />}

            {fb_group && (
              <SocialMediaButton link={fb_group} icon={AiOutlineFacebook} />
            )}

            {discord && <SocialMediaButton link={discord} icon={BsDiscord} />}
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
              onClick={() => openGroupUpdate(original._id)}
              boxSize={7}
              cursor="pointer"
            />
            <DeleteIcon
              aria-label="Delete vehicle"
              onClick={() => openGroupDelete(original._id)}
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
