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
import { AiOutlineInstagram } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import SubmitGroupForm from './forms/SubmitGroupForm';

const Groups = ({ groups }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TableView = () => {
    return useMemo(
      () => (
        <Table variant="striped" colorScheme="blue" size="lg">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Exclusivity</Th>
              <Th>Notes</Th>
              <Th>Social Media</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map((g) => (
              <Tr key={g.id}>
                <Td textTransform="capitalize">{g.name}</Td>
                <Td>{g.location}</Td>
                <Td>{g.exclusivity}</Td>
                <Td>{g.notes}</Td>
                <Td>
                  {g.instagram && (
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
      [groups],
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
