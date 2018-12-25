import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;