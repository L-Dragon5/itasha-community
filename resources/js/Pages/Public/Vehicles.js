import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Image,
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
import React, { useMemo, useState } from 'react';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

import BaseLayout from './BaseLayout';
import Button from './components/Button';
import DataTable from './components/DataTable';
import {
  SelectColumnFilter,
  TextColumnFilter,
} from './components/DataTableFilters';
import SubmitVehicleForm from './forms/SubmitVehicleForm';

const Vehicles = ({ vehicles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPictureOpen,
    onOpen: onPictureOpen,
    onClose: onPictureClose,
  } = useDisclosure();
  const [curImagePath, setCurImagePath] = useState('');

  const openImage = (imgPath) => {
    setCurImagePath(imgPath);
    onPictureOpen();
  };

  const columns = useMemo(() => [
    {
      Header: 'Image',
      id: 'image',
      width: 250,
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        if (original.cover_image) {
          const imgPath = `/storage/${original.cover_image}`;
          return (
            <Box
              width="full"
              height="150px"
              backgroundImage={`url(${imgPath})`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              onClick={() => openImage(imgPath)}
              alt="Vehicle"
              cursor="pointer"
            />
          );
        }

        return <></>;
      },
    },
    {
      Header: 'Vehicle Type',
      id: 'vehicle_type',
      accessor: (row) => {
        return (
          row.vehicle_type.charAt(0).toUpperCase() + row.vehicle_type.slice(1)
        );
      },
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Vehicle Information',
      accessor: 'vehicle_information',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Series',
      accessor: 'series',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Character',
      accessor: 'character',
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
      Header: 'Designer',
      accessor: 'designer',
      Filter: TextColumnFilter,
    },
    {
      Header: 'Social Media',
      Cell: (cellInfo) => {
        const { original } = cellInfo.row;
        return (
          <>
            {original.instagram && original.instagram !== '' && (
              <Link
                href={`https://instagram.com/${original.instagram}`}
                target="_blank"
              >
                <Icon as={AiOutlineInstagram} boxSize={7} />
              </Link>
            )}

            {original.twitter && original.twitter !== '' && (
              <Link
                href={`https://twitter.com/${original.twitter}`}
                target="_blank"
              >
                <Icon as={AiOutlineTwitter} boxSize={7} />
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
        <DataTable columns={columns} data={vehicles} />
      </Flex>

      <Button
        h="80px"
        w="full"
        flexShrink={0}
        borderRadius="none"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Vehicle
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Vehicle Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Help grow our database of itashas worldwide.</Text>
            <SubmitVehicleForm onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Text>
              Please wait for your submission to be added, all submissions are
              manually approved.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isPictureOpen}
        onClose={onPictureClose}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Image of Vehicle</ModalHeader>
          <ModalBody>
            <Image src={curImagePath} alt="Vehicle" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

Vehicles.layout = (page) => <BaseLayout title="Vehicles">{page}</BaseLayout>;

export default Vehicles;
