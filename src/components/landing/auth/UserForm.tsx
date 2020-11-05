import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import UserDetailsForm from './UserDetailsForm';
import Questions from './Questions';
import Confirm from './Confirm';
import UploadProfilePhoto from './UploadProfilePhoto';
import Success from './Success';

// interface StepFunction {
//   nextStep: () => void,
//   prevStep: () => void
// }
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
export default class UserForm extends React.Component<MyProps, State> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      step: 1,
      firstName: '',
      lastName: '',
      pronouns: '',
      dob: '',
      email: '',
      password: '',
    };
  }

  // Proceed to next step in registration
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    // this.setState((state) => ({
    //   step: state.step - 1,
    // }))
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  handleChange = (input: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      firstName, lastName, pronouns, dob, email, password,
    } = this.state;
    if (input === firstName) {
      this.setState({ firstName: event.target.value });
    } else if (input === lastName) {
      this.setState({ lastName: event.target.value });
    } else if (input === pronouns) {
      this.setState({ pronouns: event.target.value });
    } else if (input === dob) {
      this.setState({ dob: event.target.value });
    } else if (input === email) {
      this.setState({ email: event.target.value });
    } else if (input === password) {
      this.setState({ password: event.target.value });
    }
  };

  render() {
    const {
      step, firstName, lastName, pronouns, dob, email, password,
    } = this.state;
    const values = {
      firstName, lastName, pronouns, dob, email, password,
    };

    switch (step) {
      case 1:
        return (
          <UserDetailsForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={() => this.handleChange}
          />
        );
      case 2:
        return <Questions />;
      case 3:
        return <UploadProfilePhoto />;
      case 4:
        return <Confirm />;
      case 5:
        return <Success />;
      default:
        return 'Didney worl';
    }
  }
}
