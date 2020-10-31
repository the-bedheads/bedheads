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

const DatePicker = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);

  const onDatesChange = () => {
    console.log('ok');
  };

  // const onDatesChange = ({ startDate, endDate }) => {
  //   setDateRange({
  //     startDate,
  //     endDate,
  //   });
  // };

  const onFocusChange = () => {
    console.log('hey');
  };

  return (
    <div className="date-picker">
      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        focusedInput={focusedInput}
        startDateId="yes"
        endDateId="no"
        onDatesChange={onDatesChange}
        onFocusChange={onFocusChange}
      />
    </div>
  );
};

export default DatePicker;
