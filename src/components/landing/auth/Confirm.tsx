import React, { useState } from 'react';

interface MyProps {
  firstName: string,
  lastName: string,
  pronouns: string,
  dob: string,
  email: string,
  password: string,
  nextStep: () => void,
  prevStep: () => void,
}

const Confirm: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');

  return (
    <>
      Confirm registration details
    </>
  );
};

export default Confirm;
