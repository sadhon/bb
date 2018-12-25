import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../store/actions/categoryActions';
class CreateCategory extends Component {
    state = {
        name:'',
        bnName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
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

            this.props.hideCategory();
        }


    }
    

    render() {
        return (
        <div className='form-container'>
            <form onSubmit={this.handleSubmit} >
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" value={this.state.name} className="validate" onChange={this.handleChange} />
                        <label htmlFor="name">Category name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="bnName" type="text" value={ this.state.bnName } className="validate"  onChange={this.handleChange} />
                        <label htmlFor="bnName">Bengli name</label>
                    </div>
                </div>
                

                <button className="btn waves-effect waves-teal"> Submit</button>
            </form>
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
