import React, { FC, useState } from 'react';

const UploadProfilePhoto: FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');

  return (
    <>
      Upload user profile photo
    </>
  );
};

export default UploadProfilePhoto;
