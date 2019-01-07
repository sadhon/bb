import React from 'react';
import DbCategory from './DbCategory';
import Notification from './Notification'
import OrderByCustomer from './OrderByCustomer'

class Dashboard extends React.Component{

  render(){

    console.log(" order id : from notification : " ,  this.props.match.params.orderId)

    return (
      <div className="db">
          <div className="row">
            <div className="col m8 s12"> <DbCategory /></div>
            <div className="col m4 s12"> 
              <Notification />

              {
                this.props.match.params.orderId ?
                 ( <OrderByCustomer orderId={this.props.match.params.orderId} />) : (' ')
              }
              
            </div>
          </div>
           
           
      </div>
    )
  }
}

export default Dashboard
