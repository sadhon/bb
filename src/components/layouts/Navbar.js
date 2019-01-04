import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/fbConfig'


class Navbar extends React.Component {
    state = {
        text : ''
    }

    singIn = () =>{
        this.props.controlSingIn();
    }

    signOut = () => {
        firebase.auth().signOut().then(()=>{
            this.setState(this.state)
        });
        
        
    }

    handleClick = () => {
        this.props.toggleCatList();
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        }, ()=>{
            this.props.fetchSearchText(this.state.text);
        })
    }

    render(){

        var user = firebase.auth().currentUser;

   
        return (
            <nav className="navbar">
                <div className="nav-wrapper">
                    <div className="menu">
                        <i className="material-icons"  onClick={this.handleClick} >menu</i>
                    </div>
                    <div className="logo">
                        <Link to="/"  >Logo</Link>
                    </div>
                    <div className="form-container">
                        <form className="search-form">
                            <input onChange={ this.handleChange } className="search-box" type="text" placeholder="Search for your product" />
                        </form>
                    </div>
                    <div  className=" navbar-links">
                        {
                            user ? (<div className="sing-out-container"> <span onClick={this.signOut}>Sign out</span> <img src={user.photoURL} alt="profile" /> </div>)
                            :(<span onClick={this.singIn} >Sign in</span>)
                        }
                               
                                
                        
                    </div>
                </div>
            </nav>
        )
    }

}

export default Navbar
