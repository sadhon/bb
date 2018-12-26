import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import DbSubCat from './DbSubCat';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import { deleteCategory } from '../../store/actions/categoryActions';


class DbCat extends Component {

    deleteCategory = (docId) =>{
        this.props.deleteCategory(docId);
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
                                <div > {category.name}
                                    <span className="secondary-content"  title="Delete this category"  style={{cursor:'pointer'}} onClick={(e=>this.deleteCategory(category.id))}><i className="material-icons">delete</i></span>
                                    <Link to={'/dashboard/category/update/'+category.id}  className="secondary-content" title="Edit this category" ><i className="material-icons">edit</i></Link>
                                    <Link to={'/dashboard/subcat/create/' + category.id + '/' + category.name} className="secondary-content" title="Add a subcategory unde it"><i className="material-icons">add</i></Link>
                                </div>
                                <DbSubCat subcats={category.subcats} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) =>{
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
