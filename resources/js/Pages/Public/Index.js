import { Box } from '@chakra-ui/react';
import React from 'react';

import BaseLayout from './BaseLayout';

const Index = () => <Box>Hello World</Box>;

Index.layout = (page) => <BaseLayout title="Home">{page}</BaseLayout>;

export default Index;
