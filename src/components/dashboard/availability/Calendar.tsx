import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
console.log(localizer);

const UserCalendar = () => (
  <>
    Availability Calendar
  </>
);

export default UserCalendar;
