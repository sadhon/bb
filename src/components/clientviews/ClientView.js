import React from 'react';
import CategoryList from '../category/CategoryList';
import Navbar from '../layouts/Navbar';
import banar from '../../img/banar.jpg'
import ProductList from '../products/ProductList';
import {Link} from 'react-router-dom';
import BagProduct from '../products/BagProduct'

function getSubTotal(list){
    var sum = 0;
    for (let i = 0; i< list.length ; i++)
    {
        sum += list[i].totalPrice;
    }

    return sum;
}

class ClientView extends React.Component {
    state = {
        bag_products: []
    }

    update = (bagState) => {
        this.setState({
            bag_products: bagState
        })
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

    decrease = (id, qty) =>{

        // if bag product qty === 1 then no need to decrease just delete it
        // otherwise decrease it

        if(qty === 1){
            const updated_bag = this.state.bag_products.filter(bagProduct => bagProduct.id !== id);
            this.setState(
                {bag_products : updated_bag}
            )

        }else{
            const updated_bag = this.state.bag_products.map(bagProduct => {
 
                if(id === bagProduct.id){
                    return {
                        ...bagProduct,
                        qty: bagProduct.qty - 1,
                        totalPrice : (bagProduct.qty - 1) * bagProduct.price
                    }
                }
                return bagProduct;
            });
            
            this.setState(
                {bag_products : updated_bag}
            )
        }
    }

    render(){
        return (
            <div className='main-part'>
                <div className="">
                    <Navbar />
                    <div className="sidebar-container">
                            <CategoryList />
                    </div>
                       {/* content container */}
                    <div className="content-container">
                        <div className="product-ads">
                            <img className='banar' src={banar} alt=""/>
                        </div>
        
                        <div className="product-types-container">
                            <ul className="li product-types">
                                <li className="product-type"><Link to="/">Programming</Link></li>
                                <li className="product-type"><Link to="/">Literature</Link></li>
                                <li className="product-type"><Link to="/">Science</Link></li>
                                <li className="product-type"><Link to="/">Religious</Link></li>
                            </ul>
                        </div>


                        {
                            this.props.match.params.cat_sub ?
                                (<ProductList update={this.update} productsInsideBag={this.state.bag_products} cat_sub={this.props.match.params.cat_sub} /> ) : 
                               ( <p className="center-align">Select What type of product you need from side bar menu</p> )
                            
                        }
        
                    </div>
        
        
                        {/* bazar bag */}
        
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
        
                            <div className="summary">
                                <div className="top">
                                    <span>Items: { this.state.bag_products.length }</span>
                                    <span>SubTotal : ৳ {getSubTotal(this.state.bag_products)}</span>
                                </div>
                                <div className="bottom">
                                    <button>Order Now</button>
                                </div>
                            </div>
                        </div>
        
                    
                </div>
            </div>
        )

    }
  
}

export default ClientView
