import React, { Component } from 'react';

 
class UpdateCategory extends Component {
    state = {
        name:'',
        bnName: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

        
    render() {

        let id = this.props.match.params.cat_id;
        console.log('category id : ', id);
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
                            <button className="btn waves-effect waves-teal"> Update Category </button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}


export default UpdateCategory;