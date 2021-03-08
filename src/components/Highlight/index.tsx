import React from 'react';

import {Container, Background, Info} from './styles';

interface HighlightProps {
  background: string;
}

const Highlight: React.FC<HighlightProps> = ({background, children}) => {
  return (
    <Container>
      <Background
        source={{
          uri: background || undefined,
        }}
        resizeMode="cover"
      />
      <Info>{children}</Info>
    </Container>
  );
};

export default Highlight;
