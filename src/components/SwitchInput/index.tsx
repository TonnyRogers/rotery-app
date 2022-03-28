import React, {useState} from 'react';

import {
  Container,
  TrueOptionsButton,
  TrueOptionsButtonText,
  FalseOptionsButton,
  FalseOptionsButtonText,
  ButtonCointainer,
  Label,
} from './styles';

interface SwitchInputProps {
  trueOptionName: string;
  falseOption2Name: string;
  onValueSet: (value: boolean) => void;
  label: string;
  value?: boolean;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  trueOptionName,
  falseOption2Name,
  onValueSet,
  label,
  value,
}) => {
  const [isTrue, setIsTrue] = useState(value || false);

  function setTrue() {
    setIsTrue(true);
    onValueSet(true);
  }
  function setFalse() {
    setIsTrue(false);
    onValueSet(false);
  }

  return (
    <Container>
      <Label>{label}</Label>
      <ButtonCointainer>
        <TrueOptionsButton selected={isTrue} onPress={setTrue}>
          <TrueOptionsButtonText selected={isTrue}>
            {trueOptionName}
          </TrueOptionsButtonText>
        </TrueOptionsButton>
        <FalseOptionsButton selected={isTrue} onPress={setFalse}>
          <FalseOptionsButtonText selected={isTrue}>
            {falseOption2Name}
          </FalseOptionsButtonText>
        </FalseOptionsButton>
      </ButtonCointainer>
    </Container>
  );
};

export default SwitchInput;
