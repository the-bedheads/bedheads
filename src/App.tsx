import React from 'react';
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

import Landing from './components/landing/Landing';
import Search from './components/search/Search';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';

const App: React.FunctionComponent = (): JSX.Element => (
  <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/messages" component={Messages} />
      </Switch>
    </div>
  </Router>
);

export default App;
