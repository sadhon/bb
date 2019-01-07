import React, { Component } from 'react';
import firebase from '../../config/fbConfig'
import {Redirect} from 'react-router-dom'
import {createUser} from '../../store/actions/userActions'
import {connect} from 'react-redux'

class CreateUser extends Component {
    state={
        name:'',
        mobile: '',
        address: ''
    }

    changeHandler = (e) =>{

        
        this.setState({
            [e.target.id]:e.target.value
        })

    }
 
    handleSubmit = (e)=> {
        e.preventDefault();
        let mob_regex = /(^(\+88|88)?(01){1}(\d){9})$/;
        if(!mob_regex.test(this.state.mobile))
        {
            alert("Enter a correct format mobile no please.")
        }else{
            this.setState({
                ...this.state,
                uid: firebase.auth().currentUser.uid
            }, function(){
                this.props.createUser(this.state);
                localStorage.setItem('user', JSON.stringify(this.state));
                this.props.history.push('/');
            } )
            
        }

    }
  render() {
      
        var user = firebase.auth().currentUser;
        if(!user) return ( <Redirect to="/" />)
        
        return (
        <div className="form-container container">
            <form onSubmit={this.handleSubmit}>
                <legend><h3 className="center-align">Info to reach bazar</h3></legend>
                <input required type="text" id="name" placeholder="Real Name" onChange={this.changeHandler} />
                <input required type="text" id="residenceName" placeholder="Mess or Basa Name" onChange={this.changeHandler} />
                <input required type="tel" id="mobile" placeholder="Contact No:" onChange={this.changeHandler} />
                <textarea required id="address" placeholder="Address" onChange={this.changeHandler}></textarea>
                <button>Submit</button>
            </form>
            
        </div>
        )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user)=>dispatch(createUser(user))
    }

}

export default  connect(null, mapDispatchToProps)(CreateUser)