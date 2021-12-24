import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

import Button from '../components/Button';

/*
  New group submission form component.
*/
const SubmitGroupForm = ({ onClose }) => {
  const { data, setData, post, processing, errors, reset } = useForm(
    {
      name: '',
      location: '',
      exclusivity: '',
      notes: '',
      instagram: '',
    },
    'SubmitGroup',
  );

  const onSubmit = (e) => {
    e.preventDefault();
    post('/groups', {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <HStack my={4} spacing={4}>
        <FormControl id="name" isInvalid={!!errors?.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Group's name"
            data-cy="name-input"
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl id="location" isInvalid={!!errors?.location} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            placeholder="Group's location (can just be country)"
            data-cy="location-input"
          />
          <FormErrorMessage>{errors?.location}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl
          id="exclusivity"
          isInvalid={!!errors?.exclusivity}
          isRequired
        >
          <FormLabel>Exclusivity</FormLabel>
          <Select
            value={data.exclusivity}
            onChange={(e) => setData('exclusivity', e.target.value)}
          >
            <option value="">-- Select an option --</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
          <FormErrorMessage>{errors?.exclusivity}</FormErrorMessage>
        </FormControl>
        <FormControl id="notes" isInvalid={!!errors?.notes}>
          <FormLabel>Notes</FormLabel>
          <Input
            value={data.notes}
            onChange={(e) => setData('notes', e.target.value)}
            placeholder="Notes"
            data-cy="notes-input"
          />
          <FormErrorMessage>{errors?.notes}</FormErrorMessage>
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

      <Button leftIcon={<AddIcon />} isLoading={processing} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SubmitGroupForm;
