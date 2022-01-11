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
  Edit vehicle submission form component.
*/
const UpdateVehicleForm = ({ v, onClose }) => {
  const form = useForm(
    {
      vehicleType: v.vehicle_type || '',
      vehicleInfo: v.vehicle_information || '',
      series: v.series || '',
      character: v.character || '',
      city: v.city || '',
      state: v.state || '',
      country: v.country || '',
      lat: v.lat || '',
      lng: v.lng || '',
      designer: v.designer || '',
      instagram: v.instagram || '',
      twitter: v.twitter || '',
      coverImage: '',
    },
    'UpdateVehicle',
  );
  const { data, setData, patch, processing, errors, reset } = form;

  const onSave = (e) => {
    e.preventDefault();
    patch(`/vehicles/${v.id}`, {
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

        <FormControl id="twitter" isInvalid={!!errors?.twitter}>
          <FormLabel>Twitter</FormLabel>
          <Input
            value={data.twitter}
            onChange={(e) => setData('twitter', e.target.value)}
            placeholder="Twitter"
            data-cy="twitter-input"
          />
          <FormErrorMessage>{errors?.instagram}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack my={4} spacing={4}>
        <FormControl id="coverImage" isInvalid={!!errors?.coverImage}>
          <FormLabel>Cover Image (Don't upload to keep same image)</FormLabel>
          <Input
            variant="flushed"
            onChange={(e) => setData('coverImage', e.target.files[0])}
            type="file"
            accept="image/*"
          />
          <FormErrorMessage>{errors?.coverImage}</FormErrorMessage>
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

export default UpdateVehicleForm;
