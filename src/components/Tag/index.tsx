import React, {ReactNode} from 'react';

import {Container, AlignTypes} from './styles';
import Text from '../Text';
import {ColorsType} from '../../utils/theme';

interface TagProps {
  children: ReactNode;
  color?: ColorsType;
  align?: AlignTypes;
}

const Tag = ({children, color, align}: TagProps) => {
  return (
    <Container color={color} align={align}>
      <Text alignment="center" textWeight="bold" textColor={color && 'white'}>
        {children}
      </Text>
    </Container>
  );
};

export default Tag;
