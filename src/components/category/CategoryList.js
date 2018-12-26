import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const CategoryList = ({categories}) => {
    return (
        <div className='sidebar'>
            <ul className="category">
                {
                    categories && categories.map(category => {
                        return (
                            <li key={category.id} className="cat-item">
                                <Link to={"/" + category.name }>{category.name}</Link>
                                <ul className='subcat'>
                                    {
                                        category.subcats && category.subcats.map(subcat =>{
                                            return (
                                                <li key={subcat.name} className="subcat-item"><Link to={'/' + category.name + '/' + subcat.name} >{subcat.name} </Link></li>
                                            
                                            )
                                        })
                                    }
                                </ul>
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories : state.firestore.ordered.categories
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'categories' }
    ])
)(CategoryList)