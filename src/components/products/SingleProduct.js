import React from 'react';
import { Link } from 'react-router-dom';
import officeImg from '../../img/office.jpg';


class SingleProduct extends React.Component {
    state = {
        selected: false,
        qty: 0
    }

    handleClick = (e)=>{
        this.setState({
            selected : true,
            qty : this.state.qty + 1
        })
    }
    

    render(){
        const product = this.props.product;
        return (
            <div className="single-product" >
                <div className="card sticky-action">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" alt="hello" src={officeImg} />
                        <span onClick={this.handleClick} className="btn-floating halfway-fab waves-effect waves-light green">
                           {this.state.selected ? ( <i className="material-icons">check</i>) : ( <i className="material-icons">add</i>) }
                            </span>

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
                        <Link to='/'>Add</Link>
                        <Link to="/">Subtract</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleProduct
