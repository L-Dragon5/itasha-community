import { Head } from '@inertiajs/inertia-react';
import React from 'react';

const BaseLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Itasha Community` : 'Itasha Community'}
        </title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default BaseLayout;
