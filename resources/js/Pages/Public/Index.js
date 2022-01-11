import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Code,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Index = () => {
  const headingSize = useBreakpointValue({ base: 'md', md: 'xl' });

  const accordionItems = [
    {
      heading: '"I submitted my vehicle, but I don\'t see it yet?"',
      body: (
        <>
          <Text my={2}>
            All submissions go through a manual approval process to prevent
            duplicates and spam submissions.
          </Text>
          <Text my={2}>I'll try and get to them as soon as possible.</Text>
        </>
      ),
    },
    {
      heading: '"What do you consider itasha?"',
      body: (
        <Text my={2}>
          My personal definition is google "itasha" into google images. If you
          can screenshot any section of it, put a picture of your vehicle, and
          it fits without looking "off". Then it fits my definition of itasha.
        </Text>
      ),
    },
    {
      heading: '"I didn\'t get mine custom-designed."',
      body: (
        <Text my={2}>
          While I don't condone or agree with ready-made wraps, it's still a
          large part of the community and I don't feel comfortable
          "gate-keeping" more than necessary. Honestly, as long as it fits with
          the definiton of itasha above, it will be approved.
        </Text>
      ),
    },
    {
      heading: '"I need help!" or "I want something added/changed/fixed!"',
      body: (
        <Text my={2}>
          Raise an issue on{' '}
          <Link
            href="https://github.com/L-Dragon5/itasha-community"
            fontWeight="medium"
            color={useColorModeValue('pink.400', 'pink.100')}
            isExternal
          >
            the GitHub repository.
          </Link>{' '}
          or send me an e-mail at <Code>support@itasha.community</Code>
        </Text>
      ),
    },
    {
      heading: 'Message from the Creator',
      body: (
        <>
          <Text my={2}>Hi! This is Joe (L-Dragon).</Text>
          <Text my={2}>
            I noticed there wasn't an easy starting point for people wanting to
            get into itasha, but a lot of it is through word of mouth hidden
            behind clutter of groups. So this will be a great starting point for
            newcomers to draw inspiration from, be able to work with trusted
            designers and vendors, and find other likeminded enthusiasts in
            their area.
          </Text>
          <Text my={2}>
            The second thing this will serve is a collection of as much of the
            itasha vehicles around the world. Yea it's an ambitious task, but I
            feel like it's doable and will help connect all the different
            regions together.
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
        </>
      ),
    },
  ];

  return (
    <Flex flexGrow={1} direction="column">
      <Flex
        flexGrow={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Flex
          minH="300px"
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
          p={2}
        >
          <Heading variant="h4" size={headingSize} textAlign="center">
            A growing database of itashas around the world
          </Heading>
          <Heading variant="h4" size={headingSize} textAlign="center">
            Designers and resources for your next project
          </Heading>
          <Heading variant="h4" size={headingSize} textAlign="center">
            Find a local group
          </Heading>
        </Flex>
      </Flex>

      <Box bg={useColorModeValue('gray.100', 'gray.600')} p={3}>
        <Container maxW="container.lg.xl">
          <Heading as="h2" size="lg" mb={4}>
            About & FAQ
          </Heading>

          <Accordion allowToggle>
            {accordionItems?.map((item) => (
              <AccordionItem key={item.heading}>
                <h2>
                  <AccordionButton
                    bg={useColorModeValue('gray.200', 'gray.800')}
                    _expanded={{
                      bg: useColorModeValue('gray.300', 'gray.900'),
                    }}
                  >
                    <Box flex="1" textAlign="left">
                      {item.heading}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  bg={useColorModeValue('white', 'gray.700')}
                >
                  {item.body}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>
    </Flex>
  );
};

Index.layout = (page) => <BaseLayout title="Home">{page}</BaseLayout>;

export default Index;
