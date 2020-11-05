import React from 'react';
import {
  AppBar, TextField, Button, MuiThemeProvider,
} from '@material-ui/core';

interface State {
  step: number,
  firstName: string,
  lastName: string,
  pronouns: string,
  dob: string,
  email: string,
  password: string,
}
interface MyProps {
  nextStep: () => void,
  prevStep: () => void,
  handleChange: () => void
}

export default class UserDetailsForm extends React.Component<MyProps, State> {
  continueStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { nextStep } = this.props;
    event.preventDefault();
    nextStep();
  };

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}
