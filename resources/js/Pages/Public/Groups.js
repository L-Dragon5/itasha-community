import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { BsDiscord, BsMessenger } from 'react-icons/bs';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import DataTable from './components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from './components/DataTableFilters';
import SocialMediaButton from './components/SocialMediaButton';
import SubmitGroupForm from './forms/SubmitGroupForm';

const Groups = ({ groups }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(() => [
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
  ]);

  return (
    <Flex flexGrow={1} maxWidth="full" direction="column">
      <Flex direction="column" overflow="auto" flexGrow={1} mb={3}>
        <DataTable columns={columns} data={groups} />
      </Flex>

      <Button
        h={20}
        w="full"
        borderRadius="none"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Group
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Group Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Help grow our database of itasha car groups worldwide.</Text>
            <SubmitGroupForm onClose={onClose} />
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

Groups.layout = (page) => <BaseLayout title="Groups">{page}</BaseLayout>;

export default Groups;
