import { AddIcon } from '@chakra-ui/icons';
import {
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AiOutlineGlobal, AiOutlineInstagram } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import DataTable from './components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from './components/DataTableFilters';
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
