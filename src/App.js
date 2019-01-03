import React, { Component } from 'react';
import {HashRouter , Switch, Route} from 'react-router-dom';
import ClientView from './components/clientviews/ClientView';
import Dashboard from './components/dashboard/Dashboard';
import CreateSubCat from './components/category/CreateSubCat';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategory from './components/category/UpdateCategory';
import CreateProduct from './components/products/CreateProduct';
import PrivacyPolicy from './components/layouts/PrivacyPolicy';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class App extends Component {

  state = { isSignedIn: false }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess : ()=> false
    }
  }


componentDidMount = () => {
  firebase.auth().onAuthStateChanged(user => {
    this.setState({ isSignedIn : !! user })
    console.log("user :", user)
  })
}



  render() {
    return (
      <HashRouter >
        <div className="App">
          <Switch>
            <Route path="/dashboard/create/product" component={CreateProduct} />
            <Route path="/dashboard/category/create" component={CreateCategory} />
            <Route path="/dashboard/category/update/:cat_id" component={UpdateCategory} />
            <Route path="/dashboard/subcat/create/:cat_id/:cat_name" component={CreateSubCat} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/:cat_sub" component={ClientView} />
            <Route path="/" component={ClientView} />
          </Switch>

          {
            this.state.isSignedIn ? (
              <div className="container">
                <h1>Signed in already</h1>
                <button onClick={()=> firebase.auth().signOut()}>SignOut</button>
                <p>Welcome { firebase.auth().currentUser.displayName }</p>
                <img src={firebase.auth().currentUser.photoURL} alt="profile pic"/>
              </div>

            ):(
              <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
              />

            )
          }
        </div>
      </HashRouter>
    );
  }
}

export default App;
