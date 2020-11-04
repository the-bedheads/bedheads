import React, { useState, SyntheticEvent } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Card } from '@material-ui/core';
import { Email, EmojiEmotions } from '@material-ui/icons';
import '../../App.css';
import realisticbed from '../../assets/realisticbed.jpg';

const {
  EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID,
} = process.env;

const Invite: React.FC = (): JSX.Element => {
  const [friendEmail, setFriendEmail] = useState<string>('');
  const [friendName, setFriendName] = useState<string>('');

  const styles = {
    header: {
      backgroundImage: `url(${realisticbed})`,
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };

  const sendEmail = (event: any): void => {
    event.preventDefault();
    console.log(friendName);
    console.log(friendEmail);
    emailjs.sendForm('service_53v3f4a', 'template_r379ghv', event.target, 'user_sr6OphdGbk92U9vz6P8xA')
      .then((result) => {
        toast.success('Invite sent!');
        console.log(result.text);
        event.target.reset();
      })
      .catch((err) => {
        toast.error('There was a problem sending your invite...');
        console.log(err);
      });
  };

  return (
    <div className="invite-container" justify-content="center" style={styles.header}>
      <h1 className="text-center my-5">Invite a Friend.</h1>
      <form className="contact-form" onSubmit={sendEmail}>
        <label htmlFor="name">
          <EmojiEmotions />
          Name
          <input type="text" placeholder="Name" name="user_name" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setFriendName(ev.target.value)} />
        </label>
        <label htmlFor="email">
          <Email />
          Email
          <input type="email" placeholder="Email address" name="user_email" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setFriendEmail(ev.target.value)} />
        </label>
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default Invite;
