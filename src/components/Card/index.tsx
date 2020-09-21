import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {Container, CardHeader, Title, CardContent, BackButton} from './styles';

interface CardProps {
  icon?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({icon, title, children}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <CardHeader>
        <BackButton onPress={() => navigation.navigate('Dashboard')}>
          {icon && <Icon name={icon} size={24} color="#3dc77b" />}
        </BackButton>
        <Title>{title}</Title>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Container>
  );
};

export default Card;
