export const createCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('categories').add({
            ...category,
            order: 1,
            admin: 'sadhon'
        }).then(()=>{
            dispatch({type: "CATEGORY_CREATED", category});
        }).catch((err)=>{
            dispatch({type: "CATEGORY_CREATED_ERROR", err});
        })
    }
    
}

// export const createProject = (project) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {

//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         firestore.collection("projects").add({
//             ...project,
//             authorFirstName: profile.firstName, 
//             authorLastName: profile.lastName,
//             authorId : getState().firebase.auth.uid,
//             createdAt : new Date()

//         }).then(()=>{
//             dispatch({type: "CREATE_PROJECT", project});
//         }).catch((err)=> {
//             dispatch({type: "CREATE_PROJECT_ERROR", err});
//         })
        
//     }
// }