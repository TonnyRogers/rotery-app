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
import {useIsAndroid} from '../../hooks/useIsAndroid';

interface DateTimeInputProps {
  error?: string;
  label: string;
  date: Date;
  dateLimiter?: Date;
  onChange(date: Date): any;
  isEdition?: boolean;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  date,
  error,
  onChange,
  isEdition,
  dateLimiter,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const {isAndroid, isIOs} = useIsAndroid();

  const dateFormatted = useMemo(
    () => formatLocale(date, 'DD [de] MMMM [de] YYYY [as] HH:mm'),
    [date],
  );

  const onChangeDate = (event: any, selectDate: any): void => {
    try {
      const currentDate = selectDate || date;
      setShowDate(Platform.OS === 'ios');
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
    setShowDate(true);
    if (isEdition && isIOs) {
      setShowTime(true);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <DateButton hasError={!!error} onPress={showDatePicker}>
        <RowGroup>
          {!showDate && !showTime && (
            <DateText>
              {date ? dateFormatted : 'Clique para selecionar a data'}
            </DateText>
          )}
          {showDate && (
            <DateTimePicker
              minimumDate={dateLimiter}
              value={date}
              mode="date"
              display={isAndroid ? 'default' : 'compact'}
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
              display={isAndroid ? 'default' : 'compact'}
              onChange={onChangeTime}
              textColor="#808080"
              style={{width: 100}}
            />
          )}
        </RowGroup>
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
      {error && (
        <Text textColor="red" textWeight="light">
          {error}
        </Text>
      )}
    </Container>
  );
};

export default DateTimeInput;
