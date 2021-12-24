import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AiOutlineGlobal, AiOutlineInstagram } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import SubmitDesignerForm from './forms/SubmitDesignerForm';

const Designers = ({ designers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TableView = () => {
    return useMemo(
      () => (
        <Table variant="striped" colorScheme="blue" size="lg">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Contact</Th>
            </Tr>
          </Thead>
          <Tbody>
            {designers.map((d) => (
              <Tr key={d.id}>
                <Td textTransform="capitalize">{d.name}</Td>
                <Td>{d.location}</Td>
                <Td>
                  {d.website && (
                    <Link href={d.website} target="_blank">
                      <Icon as={AiOutlineGlobal} boxSize={7} />
                    </Link>
                  )}

                  {d.instagram && (
                    <Link
                      href={`https://instagram.com/${d.instagram}`}
                      target="_blank"
                    >
                      <Icon as={AiOutlineInstagram} boxSize={7} />
                    </Link>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ),
      [designers],
    );
  };

  return (
    <Flex flexGrow={1} maxWidth="full" direction="column">
      <Box overflow="auto" flexGrow={1}>
        <TableView />
      </Box>

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
