/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Header from '../Header';
import {StatusBar} from 'react-native';
import {KeyboardShift} from '../KeyboardShift';
import {Container} from './styles';

interface PageProps {
  showHeader?: boolean;
}

const Page: React.FC<PageProps> = ({children, showHeader = true}) => {
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
