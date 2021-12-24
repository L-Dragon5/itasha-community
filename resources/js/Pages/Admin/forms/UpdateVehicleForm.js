import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

import Button from '../components/Button';

/*
  Edit vehicle submission form component.
*/
const UpdateVehicleForm = ({ v, onClose }) => {
  const form = useForm(
    {
      vehicleType: v.vehicle_type || '',
      vehicleInfo: v.vehicle_info || '',
      series: v.series || '',
      character: v.character || '',
      city: v.city || '',
      state: v.state || '',
      country: v.country || '',
      designer: v.designer || '',
      instagram: v.instagram || '',
    },
    'UpdateVehicle',
  );
  const { data, setData, patch, processing, errors, reset } = form;

  const onApprove = (e) => {
    e.preventDefault();
    patch(`/vehicles/${v.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const onDecline = (e) => {
    e.preventDefault();
    form.delete(`/vehicles/${v.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={onApprove}>
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

export default UpdateVehicleForm;
