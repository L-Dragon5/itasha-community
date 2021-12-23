import { Flex, useToast } from '@chakra-ui/react';
import { Head, usePage } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Header from './components/Header';

/*
  Layout used for most pages.

  Changes the title of the page as well as rendering navigation.
*/
const BaseLayout = ({ title, children }) => {
  const { flash } = usePage().props;
  const toast = useToast();

  /*
    If a flash message gets sent to the site, the function delivers the message
    as a toast popup.
  */
  useEffect(() => {
    if (flash?.success?.length > 0) {
      toast({
        title: 'Success',
        description: flash?.success,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      flash.success = '';
    }
  }, [flash?.success]);

  return (
    <Flex direction="row" minHeight="100vh" maxHeight="100vh">
      <Head title={`${title} - Itasha Community`} />

      <Header side />
      <Flex as="main" flexGrow={1} p={3} overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
};

BaseLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
