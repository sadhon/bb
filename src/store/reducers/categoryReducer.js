
const categoryReducer = (state={}, action) => {
  switch(action.type){
    case 'SUBCAT_DELETED':
      console.log(state)
      return {
        ...state,
        subcats: action.new_subcat
      };

    case 'CATEGORY_DELETED' : 
    
      console.log('category deleted successful', state);
      return state;
    
    default:
     return state;
  }
}

export default categoryReducer
