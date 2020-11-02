import React, { useState } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

// export interface DatePickerProps {
//   startDate: null,
//   endDate: null,
//   startDateId: string,
//   endDateId: string,
//   onDatesChange(): void,
//   focusedInput: null,
//   onFocusChange(): void,
// }

const DatePicker = (props: any) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const {
    startDate, setStartDate, endDate, setEndDate,
  } = props;

  const onDateChange = (dates: any) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };

  const onFocusChange = (input: any) => {
    setFocusedInput(input);
  };

  return (
    <div className="date-picker">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        startDateId="yes"
        endDateId="no"
        onDatesChange={onDateChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
      />
    </div>
  );
};

export default DatePicker;
