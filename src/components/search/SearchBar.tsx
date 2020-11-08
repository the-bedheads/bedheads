import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';

import DatePicker from './SearchDatePicker';

type Search = {
  locationQuery: string;
  // onSubmit: (string) => void;
  setDefaultView: React.Dispatch<React.SetStateAction<boolean>>;
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
        <TextField
          name="locationQuery"
          inputRef={register}
          placeholder="where to?"
          fullWidth
          margin="normal"
          aria-describedby="search by location"
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
