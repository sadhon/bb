import React from 'react';
import CategoryList from '../category/CategoryList';
import Navbar from '../layouts/Navbar';
import banar from '../../img/banar.jpg'
import ProductList from '../products/ProductList';

const ClientView = (props) => {
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

                <ProductList cat_sub={props.match.params.cat_sub} />

            </div>
            
        </div>
    </div>
  )
}

export default ClientView
