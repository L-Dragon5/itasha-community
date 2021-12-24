import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Link,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AiOutlineBars,
  AiOutlineCar,
  AiOutlineFormatPainter,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

/*
  Items that will be on the top portion of a vertical navbar.
  Items that will be on the left portion of a horizontal navbar.

  Array of custom objects that hold text, location, and logo.
*/
const leftItems = [
  {
    href: '/master',
    logo: <Icon as={AiOutlineHome} />,
    label: 'Audit Log',
    base: 'home',
  },
  {
    href: '/master/vehicles',
    logo: <Icon as={AiOutlineCar} />,
    label: 'Vehicles',
  },
  {
    href: '/master/designers',
    logo: <Icon as={AiOutlineFormatPainter} />,
    label: 'Designers',
  },
  {
    href: '/master/groups',
    logo: <Icon as={AiOutlineUsergroupAdd} />,
    label: 'Groups & Clubs',
  },
  {
    href: '/master/resources',
    logo: <Icon as={AiOutlineBars} />,
    label: 'Resources',
  },
];

/*
  NavItem component that renders in navbar.

  Separated as to use InertiaLink more easily with a custom styling.
*/
const NavItem = ({ href, logo, label, base }) => {
  let { url } = usePage(); // Get current url of page.

  if (url === '/' || url === '/master') {
    url = 'home';
  }

  return (
    <Link
      as={InertiaLink}
      href={href}
      px={4}
      py={2}
      variant="navigation"
      w="full"
      className={url.startsWith(base || href) ? 'active' : ''}
      data-cy={`header${href.replaceAll('/', '-')}`}
    >
      <Flex direction="column" align="center" justify="center">
        <Box fontSize="1.5em">{logo}</Box>
        <Text align="center" fontSize="md">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

/*
  Admin Header component.

  Displays different size depending if user is logged in or not.
  Able to choose from a vertical or horizontal navbar.
*/
const AdminHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const mobile = useBreakpointValue({ base: true, lg: false }, 'base'); // Finds whether we're on mobile via theme breakpoints.
  const { isOpen, onOpen, onClose } = useDisclosure(); // Status for drawer for mobile navigation.
  const mobileDrawerRef = React.useRef();

  // If we're at a mobile breakpoint, render the mobile navbar and hamburger.
  if (mobile) {
    return (
      <Box
        as="nav"
        bg={useColorModeValue('red.400', 'red.800')}
        color="white"
        aria-label="Main Navigation"
      >
        <Flex direction="column" height="100%" alignItems="center">
          <IconButton
            ref={mobileDrawerRef}
            colorScheme="red"
            aria-label="Open navigation drawer"
            icon={<AiOutlineMenu />}
            m={4}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={mobileDrawerRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody display="flex" flexDirection="column" paddingTop={9}>
                {leftItems.map((obj) => (
                  <NavItem
                    key={obj.label}
                    href={obj.href}
                    logo={obj.logo}
                    label={obj.label}
                    base={obj.base}
                  />
                ))}
                <Spacer />
                <IconButton
                  aria-label="Change theme color"
                  colorScheme="red"
                  onClick={toggleColorMode}
                  icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    );
  }

  // Render normal vertical navbar.
  return (
    <Box
      as="nav"
      bg={useColorModeValue('red.400', 'red.800')}
      color="white"
      aria-label="Main Navigation"
    >
      <Flex direction="column" width={150} height="100%" alignItems="center">
        {leftItems.map((obj) => (
          <NavItem
            key={obj.label}
            href={obj.href}
            logo={obj.logo}
            label={obj.label}
            base={obj.base}
          />
        ))}
        <Spacer />
        <IconButton
          aria-label="Change theme color"
          colorScheme="red"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          mb={4}
        />
      </Flex>
    </Box>
  );
};

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  logo: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  base: PropTypes.string,
};

NavItem.defaultProps = {
  base: null,
};

export default AdminHeader;
