import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Email, EmojiEmotions, PersonPin } from '@material-ui/icons';
import '../../App.css';
import realisticbed from '../../assets/realisticbed.jpg';
import generateVerificationCode from '../../invite/verificationCode';

// const {
//   EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID,
// } = process.env; // hello

const Invite: React.FC = (props: any): JSX.Element => {
  const [friendEmail, setFriendEmail] = useState<string>('');
  const [friendName, setFriendName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [vCode, setVCode] = useState<string>('changed?');

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
    emailjs.sendForm('service_53v3f4a', 'template_r379ghv', event.target, 'user_sr6OphdGbk92U9vz6P8xA')
      .then((result) => {
        toast.success('Invite sent!');
        event.target.reset();
      })
      .catch((err) => {
        toast.error('There was a problem sending your invite...');
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
          <input
            type="email"
            placeholder="Enter your friend's email address"
            name="user_email"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              setFriendEmail(ev.target.value);
              setVCode(generateVerificationCode());
            }}
          />
        </label>
        <label htmlFor="sender-info">
          <PersonPin />
          Your Email
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              setUserEmail(ev.target.value);
            }}
          />
        </label>
        <input type="hidden" name="message" value={vCode} />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default Invite;
