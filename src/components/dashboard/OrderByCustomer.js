import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'

const OrderByCustomer = (props) => {
     
  if(props.orders)
  {
      var {products, user, createdAt} = props.orders[0]
      
  }
  console.log("products ......", products , user, createdAt)
  return (

        <div className="bazar-list">
           
                {
                    props.orders ?  (
                        <div>
                            <div className="customer-intro">
                                <span>{user.name} {moment(createdAt.toDate()).fromNow()}</span>
                            </div>

                            <div className="bazar-details">
                                {
                                    products.map(product =>{
                                        return product.name
                                    })
                                }
                            </div>
                        </div>

                        ) : ('')
                }
               
           

        </div>
  
  )
}

const mapStateToprops = ( state, ownProps) => {
    return {
        orders: state.firestore.ordered.orders
    }
}


export default compose(
    connect(mapStateToprops),
    firestoreConnect(ownProps => [
        {
            collection: 'orders',
            doc: ownProps.orderId

        }
    ])

)(OrderByCustomer)
