import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TechPage from './pages/TechPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/tech" component={TechPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
