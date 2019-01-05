import React, { Component } from 'react';
import {HashRouter , Switch, Route} from 'react-router-dom';
import ClientView from './components/clientviews/ClientView';
import Dashboard from './components/dashboard/Dashboard';
import CreateSubCat from './components/category/CreateSubCat';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategory from './components/category/UpdateCategory';
import CreateProduct from './components/products/CreateProduct';
import PrivacyPolicy from './components/layouts/PrivacyPolicy';
import TermsOfServices from './components/layouts/TermsOfServices'
import CreateUser from './components/user/CreateUser'


class App extends Component {


  render() {
    return (
      <HashRouter >
        <div className="App">
          <Switch>
            <Route path="/dashboard/create-product/:subCat" component={CreateProduct} />
            <Route path="/dashboard/category/create" component={CreateCategory} />
            <Route path="/dashboard/category/update/:cat_id" component={UpdateCategory} />
            <Route path="/dashboard/subcat/create/:cat_id/:cat_name" component={CreateSubCat} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-services" component={TermsOfServices} />
            <Route path="/create-user" component={CreateUser} />
            <Route path="/:subCat" component={ClientView} />
            <Route path="/" component={ClientView} />
          </Switch>

         
        </div>
      </HashRouter>
    );
  }
}

export default App;
