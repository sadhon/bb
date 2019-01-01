import React from 'react';
import SingleProduct from '../products/SingleProduct';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import BagProduct from './BagProduct';
import { timingSafeEqual } from 'crypto';

function existsInside(list, id){
    for(var i=0; i<list.length; i++){
        if(list[i].id === id){
            return true;
        }
    }
    return false;
}

function getExistingObj(list , id){
    const obj = list.filter( obj =>  obj.id === id );
    return obj;

}


class ProductList extends React.Component {

    state = {
        bag_products: []
    }



    // add to bag 
    addToBag = (product) => {
        if(existsInside(this.state.bag_products, product.id)){ // if the  selected product already exists then update the no
            const bagProducts = this.state.bag_products.map(bag_product =>{
                if(bag_product.id === product.id)
                {
                    return {
                        ...product ,
                        totalPrice: product.qty * product.price
                    }
                }

                return bag_product;
            });

            this.setState({
                bag_products : bagProducts
            })

        }else{ // if not exist just add it
            this.setState({
                bag_products : [ ...this.state.bag_products, {...product, totalPrice: product.price }]
            });
        }
    }


    // increase product from bag 

    increase = (id) =>{
        const updated_bag = this.state.bag_products.map(bagProduct => {
            if(id === bagProduct.id){
                return {
                    ...bagProduct,
                    qty: bagProduct.qty + 1,
                    totalPrice : (bagProduct.qty + 1) * bagProduct.price

                }
            }

            return bagProduct;
        })

        this.setState(
            {bag_products : updated_bag}
        )
    }

    decrease = (id) =>{
        const updated_bag = this.state.bag_products.map(bagProduct => {
            if(id === bagProduct.id){
                return {
                    ...bagProduct,
                    qty: bagProduct.qty - 1,
                    totalPrice : (bagProduct.qty - 1) * bagProduct.price

                }
            }

            return bagProduct;
        })

        this.setState(
            {bag_products : updated_bag}
        )
    }

    

    render(){

        var i = 0;

        return (
            <div className="product-list">
                {
                    this.props.products && this.props.products.map(product=>{
                        if(existsInside(this.state.bag_products, product.id))
                        {
                            let existing_product = getExistingObj(this.state.bag_products, product.id);

                            return (
                            <SingleProduct 
                            properties={existing_product[0]} 
                            addToBag={this.addToBag} 
                            product={product} 
                            key={product.name + Math.random() + "_" + i++ + new Date()} />
                            )
                        }

                        return (
                            <SingleProduct 
                            properties={ {name:'', id: '', qty: 0, price: 0}} 
                            addToBag={this.addToBag} 
                            product={product} 
                            key={product.name + Math.random() + "_" + i++ + new Date()} />
                        )
            
                    })
                }

                <div className="bag-product-list">
                    <ul className="bag-products">
                        {
                            this.state.bag_products && this.state.bag_products.map( product => {
                                return (
                                    <BagProduct 
                                    increase={this.increase} 
                                    decrease={this.decrease} 
                                    product={product} 
                                    key={product.id} /> 
                                    )
                            })
                        }
                    </ul>

                    
                </div>
                
    
            </div>
        )
    }

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
