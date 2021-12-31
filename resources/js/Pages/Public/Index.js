import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Index = () => (
  <Flex flexGrow={1} direction="column">
    <Flex
      flexGrow={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Flex
        h="full"
        w="full"
        backgroundImage="/storage/car-background.jpg"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        filter="blur(8px) brightness(0.3)"
      />
      <Flex
        as={Center}
        h="full"
        position="absolute"
        direction="column"
        justifyContent="space-around"
        color="white"
      >
        <Heading variant="h4" size="xl">
          A growing database of itashas around the world
        </Heading>
        <Heading variant="h4" size="xl">
          Designers and resources for your next project
        </Heading>
        <Heading variant="h4" size="xl">
          Find a local group
        </Heading>
      </Flex>
    </Flex>

    <Box bg={useColorModeValue('gray.100', 'gray.600')} p={3}>
      <Container maxW="container.xl">
        <Heading as="h3" size="lg" mb={4}>
          Message from the Creator
        </Heading>
        <Text my={2}>Hi! This is Joe (L-Dragon).</Text>
        <Text my={2}>
          I noticed there wasn't an easy starting point for people wanting to
          get into itasha, but a lot of it is through word of mouth hidden
          behind clutter of groups. So this will be a great starting point for
          newcomers to draw inspiration from, be able to work with trusted
          designers and vendors, and find other likeminded enthusiasts in their
          area.
        </Text>
        <Text my={2}>
          The second thing this will serve is a collection of as much of the
          itasha vehicles around the world. Yea it's an ambitious task, but I
          feel like it's doable and will help connect all the different regions
          together.
        </Text>

        <Box mt={6}>
          <Text>
            You can send bug reports or feature requests at{' '}
            <Link
              href="https://github.com/L-Dragon5/itasha-community"
              fontWeight="medium"
              color={useColorModeValue('pink.400', 'pink.100')}
              isExternal
            >
              the GitHub repository.
            </Link>
          </Text>
          <Text fontSize="xs">
            (Credit to{' '}
            <Link
              href="https://instagram.com/koi3o1"
              target="_blank"
              isExternal
            >
              @koi3o1
            </Link>{' '}
            for the background photo)
          </Text>
        </Box>
      </Container>
    </Box>
  </Flex>
);

Index.layout = (page) => <BaseLayout title="Home">{page}</BaseLayout>;

export default Index;
