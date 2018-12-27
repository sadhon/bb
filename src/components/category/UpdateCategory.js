import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateCategory} from '../../store/actions/categoryActions';
import { compose } from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
 
class UpdateCategory extends Component {
    state = {
        name:this.props.categories.name,
        bnName: this.props.categories.bnName,
        order: this.props.categories.order
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
        return (
            <div className='form-container container'>
                <div className="row">
                    <div className="col m6 offset-m3">
                        <form onSubmit={this.handleSubmit} >
                            <legend><h4>Category Updating form</h4></legend>
                            <div className="row">
                                <div className="input-field col s12">
                                    <h6>Category Name:</h6>
                                     <input id="name" type="text" value={this.state.name}  className="validate" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <h6>Bangla Name:</h6>
                                    <input id="bnName" type="text" value={this.state.bnName} className="validate"  onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <h6>Order :</h6>
                                    <input id="order" type="text" value={this.state.order} className="validate"  onChange={this.handleChange} />
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

const mapStateToProps = (state, ownProps) => {
    
    return {
        categories : state.firestore.ordered.categories[0]
    }

}

const mapDispatchToProps =(dispatch)=>{
    return {
        updateCategory: (docId, updatedCategory)=>dispatch(updateCategory(docId, updatedCategory))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'categories',
            doc: props.match.params.cat_id
        }
    ])
)(UpdateCategory);