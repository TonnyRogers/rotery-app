/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container} from './styles';
import Header from '../Header';
import {KeyboardAvoidingView, Platform, StatusBar} from 'react-native';

interface PageProps {
  showHeader?: boolean;
}

const Page: React.FC<PageProps> = ({children, showHeader = true}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, flexDirection: 'column'}}>
        <Container>
          {showHeader && <Header />}
          {children}
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default Page;
