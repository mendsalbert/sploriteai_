'use client';

import { PropsWithChildren } from 'react';
import ReduxProvider from './redux-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

type P = PropsWithChildren;

export default function Providers({ children }: P) {
  return (
    // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <UserProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </UserProvider>
    </>
  );
}
