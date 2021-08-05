/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LottieView from 'lottie-react-native';

const emptyAnimation = require('../../../assets/animations/animation_empty.json');
import {Container, CardContainer} from './styles';
import Card from '../Card';
import Text from '../Text';
import {Platform, View} from 'react-native';
import Button from '../Button';

interface EmptyProps {
  title?: string;
  subTitle?: string;
  onPressTo?(): void;
  buttonText?: string;
}

const Empty: React.FC<EmptyProps> = ({
  title = 'Ops!',
  subTitle = 'Parece que não tem nada por aqui',
  onPressTo,
  buttonText,
}) => {
  return (
    <Container>
      <Card>
        <CardContainer>
          <View style={{height: 125}}>
            <LottieView
              source={emptyAnimation}
              loop={false}
              autoPlay
              resizeMode="contain"
              hardwareAccelerationAndroid={!!(Platform.OS === 'android')}
              renderMode="AUTOMATIC"
              style={{flex: 1}}
            />
          </View>
          <Text.Paragraph
            textWeight="bold"
            alignment="center"
            textColor="green">
            {title}
          </Text.Paragraph>
          <Text.Paragraph textWeight="light" alignment="center">
            {subTitle}
          </Text.Paragraph>
          {onPressTo && (
            <Button bgColor="green" onPress={onPressTo}>
              {buttonText}
            </Button>
          )}
        </CardContainer>
      </Card>
    </Container>
  );
};

export default Empty;
