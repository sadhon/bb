export const placeOrder = (order, uid) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('orders').add({
            products: order,
            uid,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: "USER_CREATED", order});
        }).catch((err)=>{
            dispatch({type: "USER_CREATED_ERROR", err});
        })
    }
    
}