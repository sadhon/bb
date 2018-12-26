import React, { Component } from 'react';
import { createSubCat } from '../../store/actions/categoryActions';
import { connect } from 'react-redux';


class CreateSubCat extends Component {
    state = {
        name:'',
        bnName: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.cat_id;
        this.props.createSubCat(id, this.state);

    }

    changeHandle = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                <legend><h4>Create sub category</h4></legend>
                <input type="text" id="name" placeholder="Name In English " onChange={this.changeHandle} />
                <input type="text"  id="bnName" placeholder="Bangla Name" onChange={this.changeHandle} />
                <button className="btn">Create Sub category</button>
            </form>
            
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSubCat : (docId, subCat) => dispatch(createSubCat(docId, subCat))
    }

}

export default connect(null, mapDispatchToProps)(CreateSubCat)
