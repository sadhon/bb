export const placeOrder = (order, uid, user) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('orders').add({
            products: order,
            uid,
            user,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: "USER_CREATED", order});
        }).catch((err)=>{
            dispatch({type: "USER_CREATED_ERROR", err});
        })
    }
    
}


export const showSingleOrder = (order, uid, user) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('orders').add({
            products: order,
            uid,
            user,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: "USER_CREATED", order});
        }).catch((err)=>{
            dispatch({type: "USER_CREATED_ERROR", err});
        })
    }
    
}