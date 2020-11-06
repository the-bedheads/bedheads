import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@material-ui/core';

import DatePicker from './SearchDatePicker';

type Search = {
  locationQuery: string;
};

const SearchBar = (props: any) => {
  const {
    startDate, setStartDate, endDate, setEndDate, setDateRange, setDefaultView,
  } = props;
  const { register, handleSubmit } = useForm<Search>();
  const onSubmit = (data: Search) => {
    if (data.locationQuery && startDate && endDate) {
      props.onSubmit(data.locationQuery);
      // setDefaultView(false);
    } else if (!data.locationQuery && !startDate && !endDate) {
      console.error('sorry, that didn\'t work. please complete a new query.');
    } else if (!data.locationQuery) {
      console.error('please enter a destination.');
    } else if (!startDate || !endDate) {
      console.error('please enter a valid date range.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="locationQuery"
          inputRef={register}
          aria-describedby="my-helper-text"
        />
        <DatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setDateRange={setDateRange}
        />
        <Button
          type="submit"
        >
          SEARCH
        </Button>
      </form>
    </>
  );
};

export default SearchBar;
