/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState, forwardRef} from 'react';
import {Platform} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, DateButton, DateText, Label, RowGroup} from './styles';

interface DateTimeInputProps {
  label: string;
  date: Date;
  onChange(date: Date): any;
}

const DateTimeInput: React.FC<DateTimeInputProps> = (
  {label, date, onChange},
  ref,
) => {
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy 'as' HH:mm", {locale: pt}),
    [date],
  );

  const onChangeDate = (event: any, selectDate: any): void => {
    try {
      const currentDate = selectDate || date;
      setShow(Platform.OS === 'ios');
      onChange(currentDate);
      setShowTime(true);
    } catch (error) {}
  };

  const onChangeTime = (event: any, selectDate: any): void => {
    try {
      const currentDate = selectDate || date;
      setShowTime(Platform.OS === 'ios');
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
        <RowGroup>
          {!show && !showTime && (
            <DateText>
              {date ? dateFormatted : 'Clique para selecionar a data'}
            </DateText>
          )}
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              textColor="#808080"
              style={{
                width: 100,
                marginRight: 10,
              }}
              locale="pt"
            />
          )}
          {showTime && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={onChangeTime}
              textColor="#808080"
              style={{width: 100}}
            />
          )}
        </RowGroup>
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
    </Container>
  );
};

export default DateTimeInput;
