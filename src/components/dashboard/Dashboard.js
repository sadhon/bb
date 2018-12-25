import React from 'react';
import DbCategory from './DbCategory';

class Dashboard extends React.Component{

  render(){

    return (
      <div className="db">
        <div className="container">
          <DbCategory />
        </div>
      </div>
    )
  }
}

export default Dashboard
