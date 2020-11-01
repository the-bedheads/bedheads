import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import SignUp from './components/landing/auth/Signup';
import Login from './components/landing/auth/Login';
import Landing from './components/landing/Landing';
import Search from './components/search/Search';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';
import Profile from './components/profile/Profile';
import UserCalendar from './components/dashboard/availability/Calendar';

const App: React.FC = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          {/* <Route
            exact
            path="/"
            component={Dashboard}
          /> */}
          <Route
            exact
            path="/"
            render={() => (!isAuthenticated ? (
              <Login handleLogin={[isAuthenticated, setIsAuthenticated]} />) : (
                <Redirect to="/dashboard" />
            ))}
          />
          <Route
            exact
            path="/register"
            render={() => (!isAuthenticated ? (
              <SignUp />) : (
                <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (isAuthenticated ? (
              <Dashboard />) : (
                <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/search"
            component={Search}
          />
          <Route
            exact
            path="/profile"
            component={Profile}
          />
          <Route
            exact
            path="/messages"
            component={Messages}
          />
          <Route
            exact
            path="/calendar"
            component={UserCalendar}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
