//create a new category
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

//update category
export const updateCategory = (id, updatedCategory) => {
    return (dispatch, getState, { fetFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(id)
        .set(
            {
                ...updatedCategory, 
                createdAt: new Date(),
            }
            , {merge:true}
            ).then(()=>{
            dispatch({type:'CATEGORY_UPDATED', updatedCategory})
        }).catch((err)=>{
            dispatch({type:"CATEGORY_UPDATED_ERROR", err});
        })
    }
}

//delete category
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


//create a sub category under a category
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


//delete a subcategory 
export const deleteSubCat = (docId, new_subcat) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(docId).set({
            createdAt : new Date(),
            subcats : new_subcat
            }, {merge: true}).then(()=>{
            dispatch({type: "SUBCAT_DELETED", new_subcat});
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