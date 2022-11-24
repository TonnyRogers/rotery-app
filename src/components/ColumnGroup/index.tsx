import React from 'react';
import {ReactNode} from 'react';

import {Container} from './styles';

interface RowGroupProps {
  children: ReactNode;
  isFlex?: boolean;
}

const ColumnGroup = ({children, isFlex = true}: RowGroupProps) => {
  return <Container isFlex={isFlex}>{children}</Container>;
};

export default ColumnGroup;
