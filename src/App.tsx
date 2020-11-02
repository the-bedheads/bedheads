import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/landing/auth/Signup';
import Login from './components/landing/auth/Login';
import Search from './components/search/Search';
import Listing from './components/listing/Listing';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';
import UserProfile from './components/profile/UserProfile';
import UserCalendar from './components/dashboard/availability/Calendar';

toast.configure();

type UserType = {
  dob: string,
  email: string,
  first_name: string,
  guestRating: number,
  hostRating: number,
  id: number,
  inviteCount: number,
  last_name: string,
  password: string,
  profilePhoto: string,
  pronouns: string,
  swapCount: number,
  userBio: string,
};

const initUser = {
  dob: '1',
  email: '1',
  first_name: '1',
  guestRating: 1,
  hostRating: 1,
  id: 1,
  inviteCount: 1,
  last_name: '1',
  password: '1',
  profilePhoto: '1',
  pronouns: '1',
  swapCount: 1,
  userBio: '1',
};
const App: React.FC = (): JSX.Element => {
  const [isAuthenticated, setAuth] = useState(false);
  const [testUser, setTestUser] = useState(initUser);
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log('web token?', parseRes);
      if (parseRes === true) {
        setAuth(true);
      }
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    axios.get('user/')
      .then(({ data }) => {
        const idk = data.filter((user: UserType) => user.id === 1);
        setTestUser(idk[0]);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar handleLogin={[isAuthenticated, setAuth]} />
      <Switch>
        {/* <Route
            exact
            path="/"
            component={Dashboard}
          /> */}
        <Route
          exact
          strict
          path="/"
          render={() => (!isAuthenticated ? (
            <Login handleLogin={[isAuthenticated, setAuth]} />) : (
              <Redirect to="/dashboard" />
          ))}
        />
        <Route
          exact
          strict
          path="/register"
          render={() => (!isAuthenticated ? (
            <SignUp handleLogin={[isAuthenticated, setAuth]} />) : (
              <Redirect to="/" />
          ))}
        />
        <Route
          exact
          strict
          path="/dashboard"
          render={() => (isAuthenticated ? (
            <Dashboard handleLogin={[isAuthenticated, setAuth]} />) : (
              <Redirect to="/" />
          ))}
        />
        <Route
          exact
          strict
          path="/search"
          component={Search}
        />
        <Route
          exact
          path="/listing/:id"
          component={Listing}
        />
        <Route
          exact
          path="/profile"
          component={Profile}
        />
        <Route
          exact
          strict
          path="/messages"
          component={Messages}
        />
        <Route
          exact
          path="/profile"
          component={() => <UserProfile user={testUser} />}
        />
        <Route
          exact
          path="/calendar"
          component={() => <UserCalendar user={testUser} />}
        />
      </Switch>
    </BrowserRouter>

  );
};

export default App;
