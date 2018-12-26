import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ClientView from './components/clientviews/ClientView';
import Dashboard from './components/dashboard/Dashboard';
import UpdateCategory from './components/category/UpdateCategory';
import CreateSubCat from './components/category/CreateSubCat';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/dashboard/subcat/create/:cat_id" component={CreateSubCat} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/update/:cat_id" component={UpdateCategory} />
            <Route path="/" component={ClientView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
