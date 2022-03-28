import React from 'react';
import {ReactNode} from 'react';

import {Container, JustifyTypes, AlignTypes} from './styles';

interface RowGroupProps {
  justify?: JustifyTypes;
  align?: AlignTypes;
  isFlex?: boolean;
  children: ReactNode;
}

const RowGroup = ({children, justify, align, isFlex = true}: RowGroupProps) => {
  return (
    <Container justify={justify} align={align} isFlex={isFlex}>
      {children}
    </Container>
  );
};

export default RowGroup;
