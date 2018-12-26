import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteSubCat, deleteCategory } from '../../store/actions/categoryActions';
import DbCat from './DbCat';

 
class DbCategory extends Component {
    // state = {
    //     showCreateCategory: false,
    //     showUpdateCategory: false,
    //     updateId : '',
    //     deleteId: ''
    // }

    // //delete category
    // deleteCategoryHandler = (e, docId) => {
    //     this.props.deleteCategory(docId);
    // }
    // // delete sub category
    // deleteSubCatHandler = (e,id, subcats, subcat_name) =>{
    //     e.preventDefault();
    //     this.props.deleteSubCat(id, subcats, subcat_name);
    // }

    // // show form and add category
    // addCat  = () => {
    //     this.setState({
    //         ...this.state,
    //         showCreateCategory: true
    //     })
    // }

    // //hide add category form 
    // hideCategory = () =>{
    //     this.setState({
    //         ...this.state,
    //         showCreateCategory: !this.state.showCreateCategory
    //     })
    // }

    render() {
        return (
            <div className="db">
                <div className="container">
                    <DbCat />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories : state.firestore.ordered.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSubCat: (docId, subcats, subcat_name) => dispatch(deleteSubCat(docId, subcats, subcat_name)),
        deleteCategory: (docId) => dispatch(deleteCategory(docId))
    }

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection:'categories', orderBy: ['order', 'asc']}
    ])
)(DbCategory);
