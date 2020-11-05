import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppType, UserType } from 'goldilocksTypes';

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
import Profile from './components/profile/Profile';
import Swaps from './components/dashboard/swaps/Swaps';
import Invite from './components/global/Invite';

toast.configure();

const initUser = {
  dob: '1',
  email: '1',
  firstName: '1',
  guestRating: 1,
  hostRating: 1,
  id: 1,
  inviteCount: 1,
  lastName: '1',
  password: '1',
  profilePhoto: '1',
  pronouns: '1',
  swapCount: 1,
  userBio: '1',
};
const App: FC = (): JSX.Element => {
  const [isAuthenticated, setAuth] = useState(false);
  const [testUser, setTestUser] = useState(initUser);
  const [user] = useState<AppType>({
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
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    axios.get('user/')
      .then(({ data }) => {
        const userList = data.filter((tempUser: UserType) => tempUser.id === 1);
        setTestUser(userList[0]);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar handleLogin={[isAuthenticated, setAuth]} />
      <Switch>
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
              <Redirect to="/dashboard" />
          ))}
        />
        {/* // <Redirect to="/dashboard" /> */}

        <Route
          exact
          strict
          path="/dashboard"
          render={() => (isAuthenticated ? (
            <Dashboard handleLogin={[isAuthenticated, setAuth]} user={user} />) : (
              <Redirect to="/" />
          ))}
        />
        {/* //     <Login handleLogin={[isAuthenticated, setAuth]} />
           */}
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
          path="/hostProfile"
          component={Profile}
        />
        <Route
          exact
          path="/calendar"
          component={() => <UserCalendar user={user} />}
        />
        <Route
          exact
          path="/swaps"
          component={() => <Swaps user={testUser} />}
        />
        <Route
          exact
          path="/invite"
          component={Invite}
        />
      </Switch>
    </BrowserRouter>

  );
};

export default App;
