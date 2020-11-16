import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

import DatePicker from './SearchDatePicker';

type Search = {
  locationQuery: string;
  // onSubmit: (string) => void;
  setDefaultView: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    background: 'white',
  },
}));

const SearchBar = (props: any) => {
  const classes = useStyles();
  const {
    startDate, setStartDate, endDate, setEndDate, setDateRange, setDefaultView,
  } = props;
  const { register, handleSubmit } = useForm<Search>();

  const onSubmit = (data: Search) => {
    if (data.locationQuery && startDate && endDate) {
      props.onSubmit(data.locationQuery);
      setDefaultView(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="locationQuery"
          inputRef={register}
          className={classes.input}
          placeholder="where to?"
          fullWidth
          margin="normal"
          variant="outlined"
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
