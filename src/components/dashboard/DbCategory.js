import React, { Component } from 'react';
import CreateCategory from '../category/CreateCategory';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
 
class DbCategory extends Component {
    state = {
        showCreateCategory: false,
        showUpdateCategory: false
    }

    addCat  = () => {
        this.setState({
            ...this.state,
            showCreateCategory: true
        })
    }

    hideCategory = () =>{
        this.setState({
            ...this.state,
            showCreateCategory: !this.state.showCreateCategory
        })
    }

    render() {

        //console.log(this.props.categories);
        const categories = this.props.categories;


        if(this.state.showCreateCategory){
            return <CreateCategory hideCategory={this.hideCategory} />
        }
        

        return (
            <div className="db">
                <div className="container">
                    <ul className="collection with-header">
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
                                    <li className="collection-item" key={category.id}>
                                        <div>{category.name}
                                            <span className="secondary-content" onClick={this.deleteCat}><i className="material-icons">delete</i></span>
                                            <span className="secondary-content" onClick={this.updateCat} ><i className="material-icons">update</i></span>
                                        </div>
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
