/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, DateButton, DateText, Label, RowGroup} from './styles';
import Text from '../Text';
import formatLocale from '../../providers/dayjs-format-locale';

interface DateTimeInputProps {
  error?: string;
  label: string;
  date: Date;
  onChange(date: Date): any;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  date,
  error,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const dateFormatted = useMemo(
    () => formatLocale(date, 'DD [de] MMMM [de] YYYY [as] HH:mm'),
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
      <DateButton hasError={!!error} onPress={showDatePicker}>
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
              is24Hour
              style={{width: 100}}
            />
          )}
        </RowGroup>
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
      {error && <Text textColor="red">{error}</Text>}
    </Container>
  );
};

export default DateTimeInput;
