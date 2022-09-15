import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

const iconImage = require('../../../assets/animations/animation_mochilee.json');

import {Container, Content} from './styles';
import {AnimationContent} from '../AnimationContent';
import Text from '../Text';
import {LoadingContext} from '../../context/loading/context';

export function Loading() {
  const {isLoading} = useContext(LoadingContext);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Container>
        <Content>
          <AnimationContent
            align="center"
            animationJson={iconImage}
            height={180}
            loop
            duration={2665}
          />
          <Text.Title alignment="center">Carregando...</Text.Title>
        </Content>
      </Container>
    </>
  );
}
