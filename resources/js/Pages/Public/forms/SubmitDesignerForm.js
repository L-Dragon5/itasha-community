import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

import Button from '../components/Button';

/*
  New designer submission form component.
*/
const SubmitDesignerForm = ({ onClose }) => {
  const { data, setData, post, processing, errors, reset } = useForm(
    {
      name: '',
      location: '',
      website: '',
      instagram: '',
    },
    'SubmitDesigner',
  );

  const onSubmit = (e) => {
    e.preventDefault();
    post('/designers', {
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

      <Button leftIcon={<AddIcon />} isLoading={processing} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SubmitDesignerForm;
