import React from 'react';
import CategoryList from '../category/CategoryList';
import Navbar from '../layouts/Navbar';

const ClientView = () => {
  return (
    <div className='main-part'>
        <div className="">
            <Navbar />
            <div className="row">
                <div className="col m2">
                    <CategoryList />
                </div>
                <div className="col m10">
                    All about products
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClientView
