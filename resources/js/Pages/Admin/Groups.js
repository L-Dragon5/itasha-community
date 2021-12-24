import { EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import AdminLayout from './AdminLayout';
import UpdateGroupForm from './forms/UpdateGroupForm';

const Groups = ({ groups }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [group, setGroup] = useState(null);

  const openGroupUpdate = (id) => {
    setGroup(groups.find((g) => g.id === id));
    onOpen();
  };

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
              <Th>Actions</Th>
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
                <Td>
                  <EditIcon
                    aria-label="Edit group"
                    onClick={() => openGroupUpdate(g.id)}
                    boxSize={7}
                    cursor="pointer"
                  />
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
      <TableView />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Group Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateGroupForm g={group} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Groups.layout = (page) => <AdminLayout title="Groups">{page}</AdminLayout>;

export default Groups;
