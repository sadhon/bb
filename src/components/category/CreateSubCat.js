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
        this.props.history.push('/dashboard');

    }

    changeHandle = (e) => {
        this.setState({
            [e.target.id]: e.target.value.toLowerCase()
        });
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col m8 offset-m2 s12">
                    <form onSubmit={this.handleSubmit}>
                        <legend ><h5  >Create sub category under {this.props.match.params.cat_name}</h5></legend>
                        <input type="text" id="name" placeholder="Name In English " onChange={this.changeHandle} />
                        <input type="text"  id="bnName" placeholder="Bangla Name" onChange={this.changeHandle} />
                        <button className="btn">Create Sub category</button>
                    </form>
                </div>
            </div>

            
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
