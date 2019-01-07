import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteSubCat, deleteCategory } from '../../store/actions/categoryActions';
import DbCat from './DbCat';

 
class DbCategory extends Component {

    render() {
        return (
            <div className="db">
                    <DbCat />
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
