import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../../App.css';
import realisticbed from '../../assets/realisticbed.jpg';

const Invite: React.FC = (): JSX.Element => {
  const [friendEmail, setFriendEmail] = useState('');
  const { register, handleSubmit } = useForm();

  const styles = {
    header: {
      backgroundImage: `url(${realisticbed})`,
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="invite-container" style={styles.header}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="friend-email">
          <AccountCircle />
          Enter your friends email
          <input name="firstName" ref={register} />
          <input type="submit" />
        </label>
      </form>
    </div>
  );
};

export default Invite;
