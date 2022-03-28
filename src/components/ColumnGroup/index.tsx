import React from 'react';
import {ReactNode} from 'react';

import {Container} from './styles';

interface RowGroupProps {
  children: ReactNode;
}

const ColumnGroup = ({children}: RowGroupProps) => {
  return <Container>{children}</Container>;
};

export default ColumnGroup;
