import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DbSubCat from './DbSubCat';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import { deleteCategory } from '../../store/actions/categoryActions';
import moment from 'moment';


class DbCat extends Component {

    deleteCategory = (docId) =>{
        if (window.confirm("This will delete all subcategories under it. Are You Sure To Delete This Category Permanantly.")) {
            this.props.deleteCategory(docId);
        } 
    }
    

    render(){
        const categories = this.props.categories;

        return (
            <ul className="collection with-header cat">
                <li className="collection-header card">
                    <h4 style={{'textAlign': 'center'}}>Admin controll panel
                        <Link to="/dashboard/category/create" className="secondary-content"   style={{cursor:'pointer'}} title="Add New Category" >
                            <i className="material-icons">add</i>
                        </Link>
                    </h4>
                </li> 

                {
                    categories && categories.map(category=>{
                        return (
                            <li className="collection-item cat-item card" key={category.id}>
                                <div title={ "Updated:" + moment( category.createdAt.toDate() ).calendar() + ' by ' + category.admin }> {category.name} 
                                    <span className="secondary-content"  title={ "Delete " + category.name + " and it's subcategory" }  style={{cursor:'pointer'}} onClick={(e=>this.deleteCategory(category.id))}>
                                        <i className="material-icons">delete</i>
                                    </span>
                                    <Link to={'/dashboard/category/update/'+category.id}  className="secondary-content" title={'Edit ' + category.name} >
                                        <i className="material-icons">edit</i>
                                    </Link>
                                    <Link to={'/dashboard/subcat/create/' + category.id + '/' + category.name} className="secondary-content" title={'Add a sub category under ' + category.name}>
                                        <i className="material-icons">add</i>
                                    </Link>
                                </div>
                                <DbSubCat subcats={category.subcats} id={category.id} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log('from dbcat', state)
    return {
        categories: state.firestore.ordered.categories
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        deleteCategory : (docId)=>dispatch(deleteCategory(docId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'categories',
            orderBy: ['order', 'asc']
        }
    ])
    )(DbCat)
