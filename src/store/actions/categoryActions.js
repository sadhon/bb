
export const createCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('categories').add({
            ...category,
            createdAt: new Date(),
            admin: 'sadhon'
        }).then(()=>{
            dispatch({type: "CATEGORY_CREATED", category});
        }).catch((err)=>{
            dispatch({type: "CATEGORY_CREATED_ERROR", err});
        })
    }
    
}

export const updateCategory = (id, updateCategory) => {
    return (dispatch, getState, { fetFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(id)
        .update(updateCategory).then(()=>{
            dispatch({type:'CATEGORY_UPDATED', updateCategory})

        }).catch((err)=>{
            dispatch({type:"CATEGORY_UPDATED_ERROR", err});
        })
    }
}


export const deleteCategory = (docId) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('categories').doc(docId).delete()
        .then(()=>{
            dispatch({type: 'CATEGORY_DELETED', docId });
        }).catch((err)=>{
            dispatch({type: 'CATEGORY_DELETED_ERROR', err});
        })

    }
}

export const createSubCat = (docId, subCat) =>{
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(docId).update({
            createdAt: new Date(),
            'subcats' : getFirebase().firestore.FieldValue.arrayUnion(subCat)
        }).then(()=>{
            dispatch({type: "SUBCAT_CREATED", subCat});
        }).catch((err)=>{
            dispatch({type: "SUBCAT_CREATED_ERROR", err});
        })
    }
}

export const deleteSubCat = (docId, subCats, subcat_name) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(docId).set({
            createdAt : new Date(),
            //'subcats' : getFirebase().firestore.FieldValue.arrayRemove(subCat)
            subcats : subCats.filter(subcat => subcat.name !== subcat_name)
            
        }, {merge: true}).then(()=>{
            dispatch({type: "SUBCAT_DELETED", subcat_name});
        }).catch((err)=>{
            dispatch({type: "SUBCAT_DELETED_ERROR", err});
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