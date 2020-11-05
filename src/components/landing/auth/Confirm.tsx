import React, { FC, useState } from 'react';

const Confirm: FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');

  return (
    <>
      User signup form
    </>
  );
};

export default Confirm;
