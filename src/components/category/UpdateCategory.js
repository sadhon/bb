import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateCategory} from '../../store/actions/categoryActions';
import { compose } from 'redux';
 
class UpdateCategory extends Component {
    state = {
        name:'',
        bnName: '',
        order: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let docId = this.props.match.params.cat_id;
        this.props.updateCategory(docId, this.state);
        this.props.history.push("/dashboard");
    }

        
    render() {

        let id = this.props.match.params.cat_id;
        let categories = this.props.categories;
        console.log('category  : ',typeof(categories), categories);



        return (

            <div className='form-container container'>
                <div className="row">
                    <div className="col m6 offset-m3">
                        <form onSubmit={this.handleSubmit} >
                            <legend><h4>Category Updating form</h4></legend>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text"  className="validate" onChange={this.handleChange} />
                                    <label htmlFor="name">Category name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="bnName" type="text" className="validate"  onChange={this.handleChange} />
                                    <label htmlFor="bnName">Bengli name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="order" type="text" className="validate"  onChange={this.handleChange} />
                                    <label htmlFor="order">Order</label>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-teal"> Update Category </button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}



const mapDispatchToProps =(dispatch)=>{
    return {
        updateCategory: (docId, updatedCategory)=>dispatch(updateCategory(docId, updatedCategory))
    }
}


export default compose(
    connect(null, mapDispatchToProps)
)(UpdateCategory);