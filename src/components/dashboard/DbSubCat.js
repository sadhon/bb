import React from 'react';
import {Link} from 'react-router-dom';




class DbSubCat extends  React.Component {

    deletesubcat = (e, id)=> {
        console.log(id);
    }
    render(){
        const {subcats} = this.props;
        var i = 0;
        return (
            <ul className="collection db-subcat">
                {
                    subcats && subcats.map(subcat=>{
                        i++;
                        return(
                            <li className="collection-item subcat-item subcat-item card"  key={subcat.name +'__' + i + '_'+Math.random()}>
                                <div > {subcat.name}
                                    <span className="secondary-content"  title="Delete this subcat"  style={{cursor:'pointer'}} onClick={(e)=>this.deletesubcat(e, subcat)}><i className="material-icons">delete</i></span>
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

export default DbSubCat
