import React, { useState } from 'react';
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const UserCalendar: React.FC = (): JSX.Element => {
  const [sampleEvents, setSampleEvents] = useState([
    {
      title: 'Availability',
      start: '2020-10-04',
      end: '2020-10-06',
      backgroundColor: 'green',
    },
    {
      title: 'Request',
      start: '2020-10-10',
      end: '2020-10-12',
      backgroundColor: 'blue',
    },
    {
      title: 'Confirmed',
      start: '2020-10-17',
      end: '2020-10-20',
      backgroundColor: 'purple',
    },
  ]);

  // select function
  const onSelect = (info: DateSelectArg) => {
    const test = info.view.calendar;
    // on select, create event with title "availability"
    const availability = {
      title: 'Availability',
      start: info.startStr,
      end: info.endStr,
      backgroundColor: 'green',
      overlap: false,
    };
    test.addEvent(availability);
    console.log(test.getEvents().filter((event) => event.title === 'Availability'));
  };
  // send axios request to server that updates availability

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={sampleEvents}
      selectable
      eventStartEditable
      eventResizableFromStart
      eventOverlap={false}
      eventDurationEditable
      select={(info) => onSelect(info)}
    />
  );
};

export default UserCalendar;
