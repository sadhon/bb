import React from 'react';
import CategoryList from '../category/CategoryList';
import Navbar from '../layouts/Navbar';
import banar from '../../img/banar.jpg'
import ProductList from '../products/ProductList';
import {Link} from 'react-router-dom';

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

                <div className="product-types-container">
                    <ul className="li product-types">
                        <li className="product-type"><Link to="/">Programming</Link></li>
                        <li className="product-type"><Link to="/">Literature</Link></li>
                        <li className="product-type"><Link to="/">Science</Link></li>
                        <li className="product-type"><Link to="/">Religious</Link></li>
                    </ul>
                </div>
                {
                    props.match.params.cat_sub ?
                        (<ProductList cat_sub={props.match.params.cat_sub} /> ) : 
                       ( <p className="center-align">Select What type of product you need from side bar menu</p> )
                    
                }
                
                

            </div>
            
        </div>
    </div>
  )
}

export default ClientView
