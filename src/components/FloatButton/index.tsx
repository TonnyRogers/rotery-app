import React from 'react';

import {Container} from './styles';

const shapeProps = Container.defaultProps?.shape;
const alignmentProps = Container.defaultProps?.alignment;
const bgColorProps = Container.defaultProps?.bgColor;

interface FloatButtonProps {
  icon?(): JSX.Element;
  onPressAction(): void;
  alignment?: typeof alignmentProps;
  shape?: typeof shapeProps;
  bgColor?: typeof bgColorProps;
}

const FloatButton: React.FC<FloatButtonProps> = ({
  alignment,
  shape,
  icon,
  onPressAction,
  bgColor,
}) => {
  return (
    <Container
      alignment={alignment}
      shape={shape}
      onPress={onPressAction}
      bgColor={bgColor}>
      {icon && icon()}
    </Container>
  );
};

export default FloatButton;
