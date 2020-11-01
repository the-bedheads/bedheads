import React, { useEffect, useState } from 'react';
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
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';
import Profile from './components/profile/Profile';
import UserCalendar from './components/dashboard/availability/Calendar';

toast.configure();

const App: React.FC = (): JSX.Element => {
  const [isAuthenticated, setAuth] = useState(false);
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
          strict
          path="/messages"
          component={Messages}
        />
      </Switch>
    </BrowserRouter>

  );
};

export default App;
