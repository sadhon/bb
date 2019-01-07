import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import moment from 'moment'
import {Link} from 'react-router-dom'

const Notification = ({notifications}) => {
  return (
    <div className='section'>
        <div className="card">
            <div className="card-content">
                <div className="card-titlee">Notifications</div>
                <ul className="notifications">
                {
                    notifications && notifications.map(notification =>{
                        return (
                            <li key={notification.id}>
                                <span>{ notification.content}</span> <br />
                                <span>{ moment(notification.time.toDate()).fromNow() }</span>
                                <Link to={"/dashboard/" + notification.orderId } >See Order</Link>
                                
                                <br /><br/>
                            </li>
                        )
                    })
                }
                
               
                </ul>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        notifications : state.firestore.ordered.notifications
    }
}

export default compose(

connect(mapStateToProps),
firestoreConnect([
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
])

)(Notification)
