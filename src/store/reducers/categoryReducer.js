const initState = {
  categories : []
}
const categoryReducer = (state=initState, action) => {
  console.log(state)
  switch(action.type){
    case 'SUBCAT_DELETED':
      console.log(state)
      return state;

    case 'CATEGORY_DELETED' : 
    
      console.log('category deleted successful', state);
      return state;
    
    default:
     return state;
  }
}

export default categoryReducer
