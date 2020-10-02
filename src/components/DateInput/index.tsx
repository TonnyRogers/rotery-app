import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, DateButton, DateText, Label} from './styles';

interface DateInputProps {
  label?: string;
  date: Date;
  onChange(date: Date): any;
}

const DateInput: React.FC<DateInputProps> = ({date, label, onChange}) => {
  const [show, setShow] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  const onChangeDate = (event: any, selectDate: any): void => {
    try {
      const currentDate = selectDate || date;
      setShow(Platform.OS === 'ios');
      onChange(currentDate);
    } catch (error) {}
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <DateButton onPress={showDatePicker}>
        <DateText>{dateFormatted}</DateText>
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
        />
      )}
    </Container>
  );
};

export default DateInput;
