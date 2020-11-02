import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

// have to get availability from above and pass it down or else it will render twice
type UserType = {
  dob: string,
  email: string,
  first_name: string,
  guestRating: number,
  hostRating: number,
  id: number,
  inviteCount: number,
  last_name: string,
  password: string,
  profilePhoto: string,
  pronouns: string,
  swapCount: number,
  userBio: string,
};

interface CalProps {
  user: UserType,
}
const UserCalendar: React.FC<CalProps> = ({ user }): JSX.Element => {
  const [userId, setUserId] = useState(1);
  const [listingId, setListingId] = useState(1);
  const [avbs, setAvbs] = useState([]);

  const getListingId = () => axios.get(`listing/user/${user.id}`)
    .then(({ data }) => setListingId(data.id));

  const getAvailabilities = () => axios.get(`availability/allAvailabilities/${listingId}`)
    .then(({ data }) => {
      setAvbs(data);
    });

  useEffect(() => {
    getListingId()
      .then(() => getAvailabilities());
  }, [userId]);

  // select function
  const onSelect = (info: DateSelectArg) => {
    // use to edit events on calendar
    const test = info.view.calendar;
    // on select, create event with title "availability"
    const availability = {
      title: 'Availability',
      start: info.startStr,
      end: info.endStr,
      overlap: false,
      backgroundColor: 'green',
      userId,
    };
    // logic to prevent duplicate availabilities
    let flag = true;
    test.getEvents()
      .filter((event) => event.title === 'Availability')
      .forEach((e) => {
        const firstTest = moment(info.startStr).isBetween(e.start, e.end);
        const secondTest = moment(info.endStr).isBetween(e.start, e.end);
        const thirdTest = moment(info.startStr).isSame(e.start);
        const fourthTest = moment(e.start).isBetween(info.startStr, info.endStr);
        const fifthTest = moment(e.end).isBetween(info.startStr, info.endStr);
        const sixthTest = moment(info.endStr).isSame(e.end);
        if (firstTest || secondTest || thirdTest || fourthTest || fifthTest) {
          flag = false;
        }
        // if selection matches a currently displayed event
        if (thirdTest && sixthTest) {
          // if stored in database, delete it from DB
          axios.delete('availability', { params: { startDate: info.startStr, endDate: info.endStr, listingId } });
          // delete event
          e.remove();
        }
      });
    if (flag) {
      test.addEvent(availability);
      axios.post('/availability/setAvailability', { availability });
    }
    // send axios request to server that updates availability
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={avbs}
        selectable
        eventOverlap={false}
        select={(info) => onSelect(info)}
        eventBackgroundColor="green"
      />
    </Container>
  );
};

export default UserCalendar;
