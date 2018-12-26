import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../store/actions/categoryActions';
class CreateCategory extends Component {
    state = {
        name:'',
        bnName: '',
        order: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value.toLowerCase()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name.length === 0 || this.state.bnName.length === 0 )
        {
            alert("No field should be empty")
        }else{
            this.props.createCategory(this.state);
            this.setState({
                name:'',
                bnName: ''
            });

            this.props.history.push("/dashboard");
        }


    }
    

    render() {
        return (
        <div className='form-container container'>
            <div className="row">
                <div className="col m6 offset-m3 s12">
                    <form onSubmit={this.handleSubmit} >
                        <legend><h4>Create a new category</h4></legend>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text"  className="validate" onChange={this.handleChange} />
                                <label htmlFor="name">Category name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="bnName" type="text"  className="validate"  onChange={this.handleChange} />
                                <label htmlFor="bnName">Bengli name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input id="order" type="text"  className="validate"  onChange={this.handleChange} />
                                <label htmlFor="order">Order</label>
                            </div>
                        </div>
                        

                        <button className="btn waves-effect waves-teal"> Submit</button>
                    </form>
                </div>
            </div>

        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        createCategory : (category)=>dispatch(createCategory(category))
    }

}

export default connect(null, mapDispatchToProps)(CreateCategory)
