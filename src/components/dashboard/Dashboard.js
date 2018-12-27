import React from 'react';
import DbCategory from './DbCategory';
import {Link} from 'react-router-dom';

class Dashboard extends React.Component{

  render(){

    return (
      <div className="db">
        <div className="container">
          <Link to="/dashboard/create/product" >Create A Product</Link>

          <DbCategory />
        </div>
      </div>
    )
  }
}

export default Dashboard
