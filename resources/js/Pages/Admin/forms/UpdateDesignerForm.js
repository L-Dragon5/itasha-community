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
import { City, Country, State } from 'country-state-city';
import React, { useEffect } from 'react';

import Button from '../components/Button';

/*
  Edit designer submission form component.
*/
const UpdateDesignerForm = ({ d, onClose }) => {
  const form = useForm(
    {
      name: d.name || '',
      city: d.city || '',
      state: d.state || '',
      country: d.country || '',
      lat: d.lat || '',
      lng: d.lng || '',
      website: d.website || '',
      instagram: d.instagram || '',
      twitter: d.twitter || '',
    },
    'UpdateDesigner',
  );
  const { data, setData, patch, processing, errors, reset } = form;

  const onSave = (e) => {
    e.preventDefault();
    patch(`/designers/${d.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  // Get latitude and longitude of location.
  useEffect(() => {
    if (data.city !== '') {
      const cities = City.getCitiesOfState(data.country, data.state);
      const city = cities.find((c) => c.name === data.city);
      setData((prevData) => {
        return {
          ...prevData,
          lat: city.latitude,
          lng: city.longitude,
        };
      });
    } else if (data.state !== '') {
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
  }, [data.country, data.state, data.city]);

  return (
    <form onSubmit={onSave}>
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

        <FormControl id="city" isInvalid={!!errors?.city}>
          <FormLabel>City</FormLabel>
          <Select
            value={data.city}
            onChange={(e) => setData('city', e.target.value)}
            isDisabled={data.state === ''}
          >
            <option value="">-- Select an Option --</option>
            {City.getCitiesOfState(data.country, data.state).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors?.city}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="website" isInvalid={!!errors?.website}>
          <FormLabel>Website</FormLabel>
          <Input
            value={data.website}
            onChange={(e) => setData('website', e.target.value)}
            placeholder="https://..."
            data-cy="website-input"
          />
          <FormErrorMessage>{errors?.website}</FormErrorMessage>
        </FormControl>
        <FormControl id="instagram" isInvalid={!!errors?.instagram}>
          <FormLabel>Instagram</FormLabel>
          <Input
            value={data.instagram}
            onChange={(e) => setData('instagram', e.target.value)}
            placeholder="@..."
            data-cy="instagram-input"
          />
          <FormErrorMessage>{errors?.instagram}</FormErrorMessage>
        </FormControl>
        <FormControl id="twitter" isInvalid={!!errors?.twitter}>
          <FormLabel>Twitter</FormLabel>
          <Input
            value={data.twitter}
            onChange={(e) => setData('twitter', e.target.value)}
            placeholder="@..."
            data-cy="twitter-input"
          />
          <FormErrorMessage>{errors?.twitter}</FormErrorMessage>
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

export default UpdateDesignerForm;
