import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteSubCat} from '../../store/actions/categoryActions';




class DbSubCat extends  React.Component {

    deletesubcat = (e, id, subcats, subcat)=> {
        if(window.confirm('Are you sure to delete this sub category?')){
            let new_subcat = subcats.filter(sub_cat => sub_cat.name !== subcat.name );
            this.props.deleteSubCat(id, new_subcat);
        }
    }
    render(){
        const {subcats, id} = this.props;
        console.log('category id :', id);
        var i = 0;
        return (
            <ul className="collection db-subcat">
                {
                    subcats && subcats.map(subcat=>{
                        i++;
                        return(
                            <li className="collection-item subcat-item subcat-item card"  key={subcat.name +'__' + i + '_'+Math.random()}>
                                <div > {subcat.name}
                                    <span className="secondary-content"  title="Delete this subcat"  style={{cursor:'pointer'}} onClick={(e)=>this.deletesubcat(e, id, subcats, subcat)}><i className="material-icons">delete</i></span>
                                    <Link to="/"  className="secondary-content" title="Edit this subcat" ><i className="material-icons">edit</i></Link>
                                </div>
                            </li>
                        )
                    })
                }
    
            </ul>
        )
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        deleteSubCat: (docId, new_subcat) => dispatch(deleteSubCat(docId, new_subcat))
    }
}

export default connect(null, mapDispatchToProps)(DbSubCat)
