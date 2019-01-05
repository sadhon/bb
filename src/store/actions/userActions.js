export const createUser = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('users').doc(user.uid).set({
            ...user,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: "USER_CREATED", user});
        }).catch((err)=>{
            dispatch({type: "USER_CREATED_ERROR", err});
        })
    }
    
}