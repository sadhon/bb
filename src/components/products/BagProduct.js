import React, { Component } from 'react'

class BagProduct extends Component {
    increaseQty = (e, id) => {
        this.props.increase(id);
    }

    decreaseQty = (e, id, qty) =>{
        this.props.decrease(id, qty);
    }

    close = (e, id) => {
        this.props.decrease(id, 1);
    }
    render() {
        let product = this.props.product;
        return (
            <li className="single-bag-product" >
                <div className="action">
                    <span 
                    onClick={ (e)=>this.increaseQty(e, product.id )}>
                    <i className="material-icons  ">exposure_plus_1</i>
                    </span>
                    <span 
                    onClick={ (e)=> this.decreaseQty(e, product.id, product.qty )}>
                    <i className="material-icons  ">exposure_neg_1</i>
                    </span>

                </div>

                <div className="product-details">
                <span><i className="material-icons  ">play_arrow</i></span>
                    { product.name } <br />
                    ৳ { product.price }  per item 
                </div>

                <div className="qty-price">
                    qty: {product.qty} <br />
                    ৳ {product.totalPrice}

                </div>
                <div onClick={e=>this.close(e, product.id)} className="cross">x</div>
            
            </li>
        )
    }
}

export default BagProduct
