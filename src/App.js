import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ClientView from './components/clientviews/ClientView';
import Dashboard from './components/dashboard/Dashboard';
import CreateSubCat from './components/category/CreateSubCat';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategory from './components/category/UpdateCategory';
import CreateProduct from './components/products/CreateProduct';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/dashboard/create/product" component={CreateProduct} />
            <Route path="/dashboard/category/create" component={CreateCategory} />
            <Route path="/dashboard/category/update/:cat_id" component={UpdateCategory} />
            <Route path="/dashboard/subcat/create/:cat_id/:cat_name" component={CreateSubCat} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/:cat_sub" component={ClientView} />
            <Route path="/" component={ClientView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
