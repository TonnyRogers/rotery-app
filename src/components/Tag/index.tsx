import React, {ReactNode} from 'react';

import {Container, AlignTypes} from './styles';
import {ColorsType} from '../../utils/theme';

interface TagProps {
  children: ReactNode;
  color?: ColorsType;
  align?: AlignTypes;
}

const Tag = ({children, color, align}: TagProps) => {
  return (
    <Container color={color} align={align}>
      {children}
    </Container>
  );
};

export default Tag;
