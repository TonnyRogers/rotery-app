import React from 'react';
import {ReactNode} from 'react';

import {Container, JustifyTypes, AlignTypes} from './styles';

interface RowGroupProps {
  justify?: JustifyTypes;
  align?: AlignTypes;
  children: ReactNode;
}

const RowGroup = ({children, justify, align}: RowGroupProps) => {
  return (
    <Container justify={justify} align={align}>
      {children}
    </Container>
  );
};

export default RowGroup;
