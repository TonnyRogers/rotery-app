import React from 'react';
import {ReactNode} from 'react';

import {Container, JustifyTypes} from './styles';

interface RowGroupProps {
  justify?: JustifyTypes;
  children: ReactNode;
}

const RowGroup = ({children, justify}: RowGroupProps) => {
  return <Container justify={justify}>{children}</Container>;
};

export default RowGroup;
