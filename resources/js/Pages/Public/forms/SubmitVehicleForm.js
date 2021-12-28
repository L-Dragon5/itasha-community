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
  New vehicle submission form component.
*/
const SubmitVehicleForm = ({ onClose }) => {
  const { data, setData, post, processing, errors, reset } = useForm(
    {
      vehicleType: '',
      vehicleInfo: '',
      series: '',
      character: '',
      city: '',
      state: '',
      country: '',
      designer: '',
      instagram: '',
    },
    'SubmitVehicle',
  );

  const onSubmit = (e) => {
    e.preventDefault();
    post('/vehicles', {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <HStack my={4} spacing={4}>
        <FormControl
          id="vehicleType"
          isInvalid={!!errors?.vehicleType}
          isRequired
        >
          <FormLabel>Vehicle Type</FormLabel>
          <Select
            value={data.vehicleType}
            onChange={(e) => setData('vehicleType', e.target.value)}
          >
            <option value="">-- Select an Option --</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="bicycle">Bicycle</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <FormControl id="vehicleInfo" isInvalid={!!errors?.vehicleInfo}>
          <FormLabel>Vehicle Information</FormLabel>
          <Input
            value={data.vehicleInfo}
            onChange={(e) => setData('vehicleInfo', e.target.value)}
            placeholder="Year, Make, Model, etc."
            data-cy="vehicle-info-input"
          />
          <FormErrorMessage>{errors?.vehicleInfo}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="series" isInvalid={!!errors?.series} isRequired>
          <FormLabel>Series</FormLabel>
          <Input
            value={data.series}
            onChange={(e) => setData('series', e.target.value)}
            placeholder="Ex: Re:Zero"
            data-cy="series-input"
          />
          <FormErrorMessage>{errors?.series}</FormErrorMessage>
        </FormControl>
        <FormControl id="character" isInvalid={!!errors?.character}>
          <FormLabel>Character</FormLabel>
          <Input
            value={data.character}
            onChange={(e) => setData('character', e.target.value)}
            placeholder="Ex: Rem"
            data-cy="character-input"
          />
          <FormErrorMessage>{errors?.character}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="city" isInvalid={!!errors?.city}>
          <FormLabel>City</FormLabel>
          <Input
            value={data.city}
            onChange={(e) => setData('city', e.target.value)}
            placeholder="ex: Los Angeles"
            data-cy="city-input"
          />
          <FormErrorMessage>{errors?.city}</FormErrorMessage>
        </FormControl>
        <FormControl id="state" isInvalid={!!errors?.state}>
          <FormLabel>State/Province</FormLabel>
          <Input
            value={data.state}
            onChange={(e) => setData('state', e.target.value)}
            placeholder="ex: California"
            data-cy="state-input"
          />
          <FormErrorMessage>{errors?.state}</FormErrorMessage>
        </FormControl>
        <FormControl id="country" isInvalid={!!errors?.country} isRequired>
          <FormLabel>Country</FormLabel>
          <Input
            value={data.country}
            onChange={(e) => setData('country', e.target.value)}
            placeholder="ex: USA"
            data-cy="country-input"
          />
          <FormErrorMessage>{errors?.country}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="designer" isInvalid={!!errors?.designer}>
          <FormLabel>Designer</FormLabel>
          <Input
            value={data.designer}
            onChange={(e) => setData('designer', e.target.value)}
            placeholder="Designer"
            data-cy="designer-input"
          />
          <FormErrorMessage>{errors?.designer}</FormErrorMessage>
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

      <HStack my={4} spacing={4}>
        File Upload
      </HStack>

      <Button leftIcon={<AddIcon />} isLoading={processing} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SubmitVehicleForm;
