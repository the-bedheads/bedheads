import React, { useState, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import '../../../App.css';
import axios from 'axios';

// Declare the type of data that will be handled in onSubmit function
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

const SignUp: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');

  const uploadImage = async (encodedImage: any) => {
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/image/newProfilePicture`, {
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

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = {
        firstName, lastName, email, password, profilePhotoUrl,
      };
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/register`,
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
        toast.success('Registered successfullly!');
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
          {/* <UserFormFC /> */}
          <form onSubmit={onSubmitForm}>
            <div className="form-group align-center my-3">
              <label htmlFor="first-name">
                First Name
              <input
                  className="form-control my-3"
                  type="text"
                  name="first-name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="last-name">
                Last Name
              <input
                  className="form-control my-3"
                  type="text"
                  name="last-name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="email">
                Email
              <input
                  className="form-control my-3"
                  type="text"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="password">
                Password
              <input
                  className="form-control my-3"
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="form-group align-center my-3">
              <label htmlFor="verification-code">
                Enter Verification Code
              <input
                  id="imageInput"
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e)}
                  value={fileInputState}
                />
              </label>
            </div>
            <div className="form-group align-center">
              <button
                className="btn btn-success btn-block"
                type="submit"
              >
                Register
            </button>
              <br />
              <a href="/">Already registered? Login here.</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
