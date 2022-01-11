import { Icon, Link } from '@chakra-ui/react';
import React from 'react';

const SocialMediaButton = React.forwardRef(
  ({ children, link, icon, ...props }, ref) => (
    <Link ref={ref} href={link} target="_blank" {...props}>
      <Icon as={icon} boxSize={7} />
    </Link>
  ),
);

export default SocialMediaButton;
