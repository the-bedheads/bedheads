import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@material-ui/core';

type Search = {
  locationQuery: string;
};

const SearchBar = (props: any) => {
  const { register, handleSubmit } = useForm<Search>();
  const onSubmit = (data: Search) => {
    props.onSubmit(data.locationQuery);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="my-input">location to search</label> */}
        <Input
          name="locationQuery"
          inputRef={register}
          aria-describedby="my-helper-text"
        />
        {/* <FormHelperText id="my-helper-text">We will never share your email.</FormHelperText> */}
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
