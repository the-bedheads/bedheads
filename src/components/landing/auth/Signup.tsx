import React, { useState, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import '../../../App.css';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import UserFormFC from './UserFormFC';

const rh = process.env.REACT_APP_HOST;
const rp = process.env.REACT_APP_PORT;

type RegisterNewUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  verification_code: number;
};

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
}

const SignUp: React.FC<AuthProps> = ({ handleLogin: [isAuth, setAuth] }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [pronouns, setPronouns] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
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

  const uploadImage = async (encodedImage: any) => {
    await axios.get(`http://${rh}:${rp}/image/newProfilePicture`, {
      params: {
        image: encodedImage,
      },
    })
      .then(({ data }) => {
        setProfilePhotoUrl(data);
      })
      .catch((error) => console.warn(error));
  };

  const getUserProfile = async () => {
    await axios.get(`user/email/${email}`)
      .then(({ data }) => {
        const { personalityScale } = data;
        localStorage.setItem('userId', data.id);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('pronouns', data.pronouns);
        localStorage.setItem('email', data.email);
        localStorage.setItem('profilePhoto', data.profilePhoto);
        localStorage.setItem('swapCount', data.swapCount);
        localStorage.setItem('guestRating', data.guestRating);
        localStorage.setItem('hostRating', data.hostRating);
        localStorage.setItem('inviteCount', data.inviteCount);
        localStorage.setItem('userBio', data.userBio);
        localStorage.setItem('openness', personalityScale.openness);
        localStorage.setItem('conscientiousness', personalityScale.conscientiousness);
        localStorage.setItem('extraversion', personalityScale.extraversion);
        localStorage.setItem('agreeableness', personalityScale.agreeableness);
        localStorage.setItem('neuroticism', personalityScale.neuroticism);
      });
  };

  const handleFileChange = (e: any) => {
    const image = e.target.files[0];
    setSelectedFile(image);
    setFileInputState(e.target.value);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.warn('reader experienced an error');
    };
  };

  const onSubmitForm = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const body = {
        firstName,
        lastName,
        pronouns,
        email,
        password,
        profilePhotoUrl,
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
      };
      const response = await fetch(`http://${rh}:${rp}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        await getUserProfile();
        setAuth(true);
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1 className="text-center my-5">Register</h1>
        <div className="row justify-content-center">
          <Grid>
            <UserFormFC
              firstName={firstName}
              lastName={lastName}
              pronouns={pronouns}
              email={email}
              password={password}
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
              profilePhotoUrl={profilePhotoUrl}
              setProfilePhotoUrl={setProfilePhotoUrl}
              onSubmitForm={onSubmitForm}
            />
            <br />
            <a href="/">Already registered? Login here.</a>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SignUp;
