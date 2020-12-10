import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppType, UserType } from 'goldilocksTypes';

// TODO: Theming
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

// TODO: Components
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
import BulletinBoard from './components/bulletin/BulletinBoard';
import WW2 from './components/listing/WW2';
import CreateListing from './components/listing/CreateListing';

const App: FC = (): JSX.Element => {
  const [isAuth, setAuth] = useState(false);
  const [listingId, setListingId] = useState(0);
  const [user, setUser] = useState<AppType>({
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
    openness: localStorage.openness,
    conscientiousness: localStorage.conscientiousness,
    extraversion: localStorage.extraversion,
    agreeableness: localStorage.agreeableness,
    neuroticism: localStorage.neuroticism,
    hasListing: localStorage.hasListing,
  });
  const [darkMode, setDarkMode] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch('/auth/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      if (parseRes === true) {
        setAuth(true);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  const dashboardCheck = () => {
    if (!isAuth) {
      return (
        <Redirect to="/" />
      );
    }
    if (user.hasListing === 'false') {
      return (
        <CreateListing user={user} setUser={setUser} />
      );
    }
    return (
      <Swaps user={user} />
    );
  };

  useEffect(() => {
    checkAuth();
    axios.get(`listing/user/${user.id}`)
      .then(({ data }) => setListingId(data.id));
  }, [user]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <BrowserRouter>
          {isAuth && (
            <Navbar
              handleLogin={[setAuth]}
              toggleMode={[darkMode, setDarkMode]}
              hasListing={user.hasListing}
            />
          )}
          <Switch>
            <Route
              exact
              strict
              path="/"
              render={() => (!isAuth ? (
                <Login handleLogin={[isAuth, setAuth]} setUser={setUser} />) : (
                  <Redirect to="/view-swaps" />
              ))}
            />
            <Route
              exact
              strict
              path="/register"
              render={() => (!isAuth ? (
                <SignUp handleLogin={[isAuth, setAuth]} />) : (
                  <Redirect to="/view-swaps" />
              ))}
            />
            <Route
              exact
              strict
              path="/view-swaps"
              render={() => dashboardCheck()}
            />
            <Route
              exact
              strict
              path="/view-searches"
              component={Search}
            />
            <Route
              exact
              path="/view-listing/:id/:avbId"
              component={() => <Listing user={user} />}
            />
            <Route
              exact
              strict
              path="/view-messages"
              component={() => <Messages user={user} />}
            />
            <Route
              exact
              path="/view-profile"
              component={() => <UserProfile user={user} setUser={setUser} />}
            />
            <Route
              exact
              path="/view-hostProfile"
              component={Profile}
            />
            <Route
              exact
              path="/view-calendar"
              component={() => <UserCalendar user={user} listingId={listingId} />}
            />
            <Route
              exact
              path="/view-swaps"
              component={() => <Swaps user={user} />}
            />
            <Route
              exact
              path="/view-invites"
              component={Invite}
            />
            <Route
              exact
              path="/view-bulletins"
              component={BulletinBoard}
            />
            {/* <Route
              exact
              path="/writeReview"
              component={() => <WW2 />}
            /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
