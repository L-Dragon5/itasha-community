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
import { AiOutlineGlobal, AiOutlineInstagram } from 'react-icons/ai';

import AdminLayout from './AdminLayout';
import UpdateDesignerForm from './forms/UpdateDesignerForm';

const Designers = ({ designers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [designer, setDesigner] = useState(null);

  const openDesignerUpdate = (id) => {
    setDesigner(designers.find((d) => d.id === id));
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
              <Th>Contact</Th>
              <Th>Actions</Th>
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
                <Td>
                  <EditIcon
                    aria-label="Edit designer"
                    onClick={() => openDesignerUpdate(d.id)}
                    boxSize={7}
                    cursor="pointer"
                  />
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
      <TableView />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Designer Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <UpdateDesignerForm d={designer} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Designers.layout = (page) => (
  <AdminLayout title="Designers">{page}</AdminLayout>
);

export default Designers;
