import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

import Button from '../components/Button';

/*
  Edit designer submission form component.
*/
const UpdateDesignerForm = ({ d, onClose }) => {
  const form = useForm(
    {
      name: d.name || '',
      location: d.location || '',
      website: d.website || '',
      instagram: d.instagram || '',
    },
    'UpdateDesigner',
  );
  const { data, setData, patch, processing, errors, reset } = form;

  const onApprove = (e) => {
    e.preventDefault();
    patch(`/designers/${d.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const onDecline = (e) => {
    e.preventDefault();
    form.delete(`/designers/${d.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={onApprove}>
      <HStack my={4} spacing={4}>
        <FormControl id="name" isInvalid={!!errors?.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Designer's name"
            data-cy="name-input"
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl id="location" isInvalid={!!errors?.location} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            placeholder="Designer's location (can just be country)"
            data-cy="location-input"
          />
          <FormErrorMessage>{errors?.location}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="website" isInvalid={!!errors?.website}>
          <FormLabel>Website</FormLabel>
          <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input
              value={data.website}
              onChange={(e) => setData('website', e.target.value)}
              data-cy="website-input"
            />
          </InputGroup>
          <FormErrorMessage>{errors?.website}</FormErrorMessage>
        </FormControl>
        <FormControl id="instagram" isInvalid={!!errors?.instagram}>
          <FormLabel>Instagram</FormLabel>
          <Input
            value={data.instagram}
            onChange={(e) => setData('instagram', e.target.value)}
            placeholder="Instagram"
            data-cy="instagram-input"
          />
          <FormErrorMessage>{errors?.instagram}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack>
        <ButtonGroup spacing={2}>
          <Button leftIcon={<AddIcon />} isLoading={processing} type="submit">
            Approve
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
        <Spacer />
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="yellow"
          isLoading={processing}
          onClick={onDecline}
        >
          Decline
        </Button>
      </HStack>
    </form>
  );
};

export default UpdateDesignerForm;
