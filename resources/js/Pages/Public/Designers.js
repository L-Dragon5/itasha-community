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
  AiOutlineGlobal,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import DataTable from './components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from './components/DataTableFilters';
import SocialMediaButton from './components/SocialMediaButton';
import SubmitDesignerForm from './forms/SubmitDesignerForm';

const Designers = ({ designers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(() => [
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
        const { website, instagram, twitter } = cellInfo.row.original;
        return (
          <>
            {website && (
              <SocialMediaButton link={website} icon={AiOutlineGlobal} />
            )}

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
  ]);

  return (
    <Flex flexGrow={1} maxWidth="full" direction="column">
      <Flex direction="column" overflow="auto" flexGrow={1} mb={3}>
        <DataTable columns={columns} data={designers} />
      </Flex>

      <Button
        h={20}
        w="full"
        borderRadius="none"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Designer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Designer Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Help grow our database of itasha designers worldwide.</Text>
            <SubmitDesignerForm onClose={onClose} />
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

Designers.layout = (page) => <BaseLayout title="Designers">{page}</BaseLayout>;

export default Designers;
