import React from 'react';

import {Container, CardContent} from './styles';

const Card: React.FC = ({children}) => {
  return (
    <Container>
      <CardContent>{children}</CardContent>
    </Container>
  );
};

export default Card;
