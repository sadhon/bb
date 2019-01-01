import React from 'react';
import officeImg from '../../img/office.jpg';


class SingleProduct extends React.Component {
    state = {
        selected: this.props.properties.selected,
        qty: this.props.properties.qty,
        name: this.props.properties.name,
        id: this.props.properties.id, 
        price: this.props.properties.price
    }

    handleClick = (e, id, price, name) =>{

        this.setState({
            selected : true,
            qty : this.state.qty + 1,
            id:id,
            price: price,
            name:name, 
            totalPrice: price
        },  function(){
            this.props.addToBag(this.state)
        } );

    }

    ///decrease qty
    decreaseQty = ( e, id, qty ) => {
        console.log('qty :   : ', qty);
        this.props.decrease(id, qty);

    }



    render(){
        const product = this.props.product;
        return (
            <div className="single-product" >
                <div className="card sticky-action">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" alt="hello" src={officeImg} />
                        {
                            this.state.selected ? (
                                <span className="btn-floating halfway-fab waves-effect waves-light green">
                                    <i className="material-icons">check</i>
                                </span>
                            ): ('')
                        }

                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{ product.name }</span>
                        <p> <span className="price"> ৳ { product.price } </span> ( per {product.perUnit + " " + product.measurementUnit} ) </p>
                    </div>


                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Details<i className="material-icons right">close</i></span>
                        <p>{product['desc']}</p>
                    </div>


                    <div className="card-action">
                        <button   
                        title="add to bag"
                        className="left"
                        onClick={e=>this.handleClick(e, product.id, product.price, product.name)} >
                            <i className="material-icons  ">exposure_plus_1</i>
                        </button>

                        <p className="left"> qty:  {this.state.qty}</p>
                       
                        <button 
                        title="remove from bag"
                        className="right" 
                        disabled={this.state.qty < 1}
                        onClick={e=>this.decreaseQty(e, product.id, this.state.qty)}>
                            <i className="material-icons  ">exposure_neg_1</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleProduct
