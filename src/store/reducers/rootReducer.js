import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";


const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;