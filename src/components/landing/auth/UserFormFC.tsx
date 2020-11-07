import React, { useState } from 'react';
import MuiThemeProvider from '@material-ui/core/styles';
import UserDetailsForm from './UserDetailsForm';
import Questions from './Questions';
import Questions2 from './Questions2';
import UploadProfilePhoto from './UploadProfilePhoto';
import Confirm from './Confirm';
import Success from './Success';

interface MyProps {
  nextStep: () => void,
  prevStep: () => void,
  handleChange: (
    input: string,
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => void
}

const UserFormAsFC: React.FC = (props: any): JSX.Element => {
  const {
    firstName, lastName, pronouns, dob, email, password,
  } = props;

  const [step, setStep] = useState(1);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [prefpros, setPronouns] = useState('');
  const [birthday, setDob] = useState('');
  const [emailaddress, setEmail] = useState('');
  const [pword, setPassword] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (input === 'firstName') {
      setFirstName(event.target.value);
    } else if (input === 'lastName') {
      setLastName(event.target.value);
    } else if (input === 'pronouns') {
      setPronouns(event.target.value);
    } else if (input === 'dob') {
      setDob(event.target.value);
    } else if (input === 'email') {
      setEmail(event.target.value);
    } else if (input === 'password') {
      setPassword(event.target.value);
    }
  };

  switch (step) {
    case 1:
      return (
        <UserDetailsForm
          firstName={firstname}
          lastName={lastname}
          pronouns={prefpros}
          email={emailaddress}
          dob={birthday}
          password={pword}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={() => handleChange}
        />
      );
    case 2:
      return (
        <Questions
          firstName={firstname}
          lastName={lastname}
          pronouns={prefpros}
          email={emailaddress}
          dob={birthday}
          password={pword}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={() => handleChange}
        />
      );
    case 3:
      return (
        <Questions2
          firstName={firstname}
          lastName={lastname}
          pronouns={prefpros}
          email={emailaddress}
          dob={birthday}
          password={pword}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={() => handleChange}
        />
      );
    case 4:
      return (
        <UploadProfilePhoto
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 5:
      return (
        <Confirm
          firstName={firstname}
          lastName={lastname}
          pronouns={prefpros}
          email={emailaddress}
          dob={birthday}
          password={pword}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 6:
      return <Success />;
    default:
      return <h1>Didney worl</h1>;
  }
};

export default UserFormAsFC;
