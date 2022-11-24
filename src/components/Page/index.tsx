/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';

import Header from '../Header';
import {StatusBar} from 'react-native';
import {KeyboardShift} from '../KeyboardShift';
import {Container} from './styles';

interface PageProps {
  showHeader?: boolean;
  children: ReactNode;
}

const Page = ({children, showHeader = true}: PageProps) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardShift>
        <Container>
          {showHeader && <Header />}
          {children}
        </Container>
      </KeyboardShift>
    </>
  );
};

export default Page;
