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
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => void
}

const UserFormAsFC: React.FC = (props: any): JSX.Element => {
  const [step, setStep] = useState(1);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [prefpros, setPronouns] = useState('');
  const [birthday, setDob] = useState('');
  const [emailaddress, setEmail] = useState('');
  const [pword, setPassword] = useState('');
  const [q1, setResponse1] = useState('');
  const [q2, setResponse2] = useState('');
  const [q3, setResponse3] = useState('');
  const [q4, setResponse4] = useState('');
  const [q5, setResponse5] = useState('');
  const [q6, setResponse6] = useState('');
  const [q7, setResponse7] = useState('');
  const [q8, setResponse8] = useState('');
  const [q9, setResponse9] = useState('');
  const [q10, setResponse10] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    if (type === 'firstName') {
      setFirstName(e.target.value);
    } else if (type === 'lastName') {
      setLastName(e.target.value);
    } else if (type === 'pronouns') {
      setPronouns(e.target.value);
    } else if (type === 'dob') {
      setDob(e.target.value);
    } else if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleResponse = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    if (type === 'response1') {
      setResponse1(e.target.value);
    } else if (type === 'response2') {
      setResponse2(e.target.value);
    } else if (type === 'response3') {
      setResponse3(e.target.value);
    } else if (type === 'response4') {
      setResponse4(e.target.value);
    } else if (type === 'response5') {
      setResponse5(e.target.value);
    } else if (type === 'response6') {
      setResponse6(e.target.value);
    } else if (type === 'response7') {
      setResponse7(e.target.value);
    } else if (type === 'response8') {
      setResponse8(e.target.value);
    } else if (type === 'response9') {
      setResponse9(e.target.value);
    } else if (type === 'response10') {
      setResponse10(e.target.value);
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
          handleChange={handleChange}
        />
      );
    case 2:
      return (
        <Questions
          q1={q1}
          q2={q2}
          q3={q3}
          q4={q4}
          q5={q5}
          nextStep={nextStep}
          prevStep={prevStep}
          handleResponse={handleResponse}
        />
      );
    case 3:
      return (
        <Questions2
          q6={q6}
          q7={q7}
          q8={q8}
          q9={q9}
          q10={q10}
          nextStep={nextStep}
          prevStep={prevStep}
          handleResponse={handleResponse}
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
          q1={q1}
          q2={q2}
          q3={q3}
          q4={q4}
          q5={q5}
          q6={q6}
          q7={q7}
          q8={q8}
          q9={q9}
          q10={q10}
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
