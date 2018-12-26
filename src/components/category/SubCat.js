import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

const SubCat = (props) => {

    let id = props.id;
    let category = props.category;
    console.log('sb category :' , category);


  return (

        <ul className="subcat" id={id + 'id'}>
            <li>
                <Link to={"/"}> this is from subnav </Link>
                                    
            </li>
        </ul>

  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        subCat : state.firestore.ordered['categories/Ra2OpEj9eCl90aweyHsH/subCat']
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'categories/Ra2OpEj9eCl90aweyHsH/subCat'
        }
    ])

)(SubCat);
