import React, { Component } from 'react';
import CreateCategory from '../category/CreateCategory';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
 
class DbCategory extends Component {
    state = {
        showCreateCategory: false,
        showUpdateCategory: false,
        updateId : '',
        deleteId: ''
    }

    // show form and add category
    addCat  = () => {
        this.setState({
            ...this.state,
            showCreateCategory: true
        })
    }



    //hide add category form 
    hideCategory = () =>{
        this.setState({
            ...this.state,
            showCreateCategory: !this.state.showCreateCategory
        })
    }



    render() {

        console.log(this.props.categories);
        const categories = this.props.categories;


        if(this.state.showCreateCategory){
            return <CreateCategory hideCategory={this.hideCategory} />
        }
        

        return (
            <div className="db">

                <div className="container">
                    <ul className="collection with-header cat">
                        <li className="collection-header">
                            <h4>First Names 
                                <span className="secondary-content"  onClick={this.addCat} >
                                    <i className="material-icons">add</i>
                                </span>
                            </h4>
                        </li>

                        {
                            categories && categories.map(category=>{
                                return (
                                    <li className="collection-item cat-item" key={category.id}>
                                        <div >{category.name}
                                            <Link to={'/dashboard/update/' + category.id }  className="secondary-content" ><i className="material-icons">update</i></Link>
                                            <Link to={'/dashboard/subcat/create/' + category.id }  className="secondary-content" ><i className="material-icons">add</i></Link>
                                        </div>

                                        <ul className="collection sub-cat">
                                            {
                                                category.subcats && category.subcats.map(subcat => {
                                                    return (
                                                        <li className="collection-item subcat-item" key={subcat.name}>
                                                            <div>{subcat.name}
                                                                <span className="secondary-content" onClick={this.deleteCat}><i className="material-icons">delete</i></span>
                                                                <Link to={'/dashboard/update/' + category.id }  className="secondary-content" ><i className="material-icons">update</i></Link>
                                                                <Link to={'/dashboard/subcat/create/' + category.id }  className="secondary-content" ><i className="material-icons">add</i></Link>
                                                            </div>                                             
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </li>
                                )
                            })

                        }

                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
        categories : state.firestore.ordered.categories
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'categories'}
    ])
)(DbCategory);
