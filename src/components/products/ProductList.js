import React from 'react';
import SingleProduct from '../products/SingleProduct';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

const ProductList = (props) => {
    var i = 0;

    return (
        <div className="product-list">
            <h6 className="center-align">Products</h6>

            {
                props.products && props.products.map(product=>{
                    return <SingleProduct product={product} key={product.name + Math.random() + "_" + i++ + new Date()} />
        
                })
            }
            

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products : state.firestore.ordered.products
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(ownprops => [
        {
            collection: 'products',
            where : ['cat_sub', '==', ownprops.cat_sub]
            
        }
    ])

)(ProductList);
