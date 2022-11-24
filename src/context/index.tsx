import React from 'react';
import {LoadingContextProvider} from './loading/context';

export function GlobalContext({children}: {children: React.ReactNode}) {
  return (
    <>
      <LoadingContextProvider>{children}</LoadingContextProvider>
    </>
  );
}
