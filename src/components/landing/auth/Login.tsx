import React, { useEffect, SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AppType } from 'goldilocksTypes';
import { toast } from 'react-toastify';
import nightbed from '../../../assets/nightbed.jpg';
import LoginExistingUser from './ts-utils/types';
import '../../../App.css';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  setUser: React.Dispatch<React.SetStateAction<AppType>>,
}
const styles = {
  header: {
    backgroundImage: `url(${nightbed})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};
const Login: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth], setUser }) => {
  const { errors } = useForm<LoginExistingUser>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUser = () => {
    setUser({
      id: localStorage.userId,
      firstName: localStorage.firstName,
      guestRating: localStorage.guestRating,
      hostRating: localStorage.hostRating,
      inviteCount: localStorage.inviteCount,
      profilePhoto: localStorage.profilePhoto,
      pronouns: localStorage.pronouns,
      swapCount: localStorage.swapCount,
      userBio: localStorage.userBio,
      email: localStorage.email,
    });
    setAuth(true);
  };

  const logoutUser = () => {
    setAuth(false);
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

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((data) => data);

      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        await getUserProfile();
        loginUser();
        toast.success('Logged in successfully!');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      toast.error('Invalid credentials entered!');
      console.warn(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-center my-5">Login</h1>
      <div className="row justify-content-center">
        <form>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                className="form-control my-3"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error"> Enter A Valid Email </div>}
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Enter Password
              <input
                className="form-control my-3"
                type="password"
                id="password"
                name="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="error">Enter A Valid Password </div>}
            </label>
          </div>
          <div className="button">
            <button
              className="btn btn-success btn-block"
              type="submit"
              onClick={onLogin}
            >
              Start Swapping
            </button>
            <a href="/register">Have a verification code? Sign Up Here</a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
