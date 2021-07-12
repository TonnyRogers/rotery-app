/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container} from './styles';
import Header from '../Header';
import {KeyboardAvoidingView, Platform} from 'react-native';

interface PageProps {
  showHeader?: boolean;
  onTouchStart?: () => void;
}

const Page: React.FC<PageProps> = ({
  children,
  showHeader = true,
  onTouchStart,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, flexDirection: 'column'}}
      onTouchStart={onTouchStart}>
      <Container>
        {showHeader && <Header />}
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Page;
