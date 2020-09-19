import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, DateButton, DateText, Label} from './styles';

interface DateInputProps {
  date: Date;
  onChange?(date: any): any;
}

const DateInput: React.FC<DateInputProps> = ({date, onChange}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  const onChanged = (event: any, selectDate: any): void => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Container>
      <Label>Data de Nascimento</Label>
      <DateButton onPress={showDatePicker}>
        <DateText>{dateFormatted}</DateText>
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={onChanged}
        />
      )}
    </Container>
  );
};

export default DateInput;
