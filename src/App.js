import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ClientView from './components/clientviews/ClientView';
import Dashboard from './components/dashboard/Dashboard';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ClientView} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
