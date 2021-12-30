import { AddIcon } from '@chakra-ui/icons';
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
import { Country, State } from 'country-state-city';
import React, { useEffect } from 'react';

import Button from '../components/Button';

/*
  Edit group submission form component.
*/
const UpdateGroupForm = ({ g, onClose }) => {
  const form = useForm(
    {
      name: g.name || '',
      state: g.state || '',
      country: g.country || '',
      lat: g.lat || '',
      lng: g.lng || '',
      exclusivity: g.exclusivity || '',
      notes: g.notes || '',
      instagram: g.instagram || '',
    },
    'UpdateGroup',
  );
  const { data, setData, patch, processing, errors, reset } = form;

  const onSave = (e) => {
    e.preventDefault();
    patch(`/groups/${g.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  // Get latitude and longitude of location.
  useEffect(() => {
    if (data.state !== '') {
      const state = State.getStateByCodeAndCountry(data.state, data.country);
      setData((prevData) => {
        return {
          ...prevData,
          lat: state.latitude,
          lng: state.longitude,
        };
      });
    } else if (data.country !== '') {
      const country = Country.getCountryByCode(data.country);
      setData((prevData) => {
        return {
          ...prevData,
          lat: country.latitude,
          lng: country.longitude,
        };
      });
    }
  }, [data.country, data.state]);

  return (
    <form onSubmit={onSave}>
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
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="country" isInvalid={!!errors?.country} isRequired>
          <FormLabel>Country</FormLabel>
          <Select
            value={data.country}
            onChange={(e) => setData('country', e.target.value)}
          >
            <option value="">-- Select an Option --</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors?.country}</FormErrorMessage>
        </FormControl>

        <FormControl id="state" isInvalid={!!errors?.state}>
          <FormLabel>State/Province</FormLabel>
          <Select
            value={data.state}
            onChange={(e) => setData('state', e.target.value)}
            isDisabled={data.country === ''}
          >
            <option value="">-- Select an Option --</option>
            {State.getStatesOfCountry(data.country).map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors?.state}</FormErrorMessage>
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

      <HStack>
        <ButtonGroup spacing={2}>
          <Button leftIcon={<AddIcon />} isLoading={processing} type="submit">
            Update
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
        <Spacer />
      </HStack>
    </form>
  );
};

export default UpdateGroupForm;
