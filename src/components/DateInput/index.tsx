/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {Platform} from 'react-native';

import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, DateButton, DateText, Label} from './styles';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {useIsAndroid} from '../../hooks/useIsAndroid';

interface DateInputProps {
  label?: string;
  date: Date;
  dateLimiter?: Date;
  onChange(date: Date): any;
}

const DateInput: React.FC<DateInputProps> = ({
  date,
  label,
  onChange,
  dateLimiter,
}) => {
  const [show, setShow] = useState(false);
  const {isAndroid} = useIsAndroid();

  const dateFormatted = useMemo(
    () => formatLocale(date, 'DD [de] MMM [de] YYYY'),
    [date],
  );

  const onChangeDate = (event: Event, selectDate?: Date): void => {
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
        {!show && (
          <DateText>
            {date ? dateFormatted : 'Clique para selecionar a data'}
          </DateText>
        )}
        {show && (
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
        <Icon name="calendar-today" color="#808080" size={24} />
      </DateButton>
    </Container>
  );
};

export default DateInput;
