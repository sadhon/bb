import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

function search(id, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
            return myArray[i];
        }
    }
}

class CreateProduct extends Component {
    state ={
        cat: '',
        sub:''
    }


    // for main cat change
    handleChange = (e) => {

        var index = e.nativeEvent.target.selectedIndex;
        var catId = e.nativeEvent.target[index].id
        const categories = this.props.categories;
        const category = search(catId, categories);
        const subcats = category.subcats.length > 0 ? category.subcats :null;
        
        this.setState({
            [e.target.id] : e.target.value,
            subcats : subcats
        })
    }

    //for sub cat change
    handleSubChange = (e) => {
        const sc = this.state.cat + '_' +   e.target.value;
        const cat_sub = sc.replace(" ", "_");
        

        this.setState({
            [e.target.id] : e.target.value,
            cat_sub
        })
    }


    // for form submission
    handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(this.state);
    }

  render() {

        var i = 0;// for sure random value creation
        const {categories} = this.props;
        const categoryList = categories &&  categories.map(category=>{
            return(
                <option   key={category.id} id={category.id} value={category.name}>{category.name   + " ( " + category.subcats.length + " ) "}</option>
            )
        })

        //const subCatList = categoires
    
    return (
      <div className="container">
            <form onSubmit={this.handleSubmit}>
                <legend><h4 className='center-align'>Create a new product</h4></legend>
                <div className="input-field col s12">
                    <div className="row">
                        <select value={this.state.cat} id="cat" className="capitalize col m6 s12" onChange={this.handleChange}>
                            <option value="" disabled >Select A Category </option>
                            {
                                categoryList
                            }
                        </select>
                    </div>
                </div>

                <div className="input-field col s12">
                    <div className="row">
                        <select value={this.state.sub} id="sub" className="capitalize col m6 s12" onChange={this.handleSubChange}>
                            <option value="" disabled > Select A Sub Category </option>
                            
                            {
                            this.state.subcats && this.state.subcats.map((subcat) =>{

                                return (
                                    <option key={subcat.name + '_'+ Math.random() + '_' + i++ } value={subcat.name}> {subcat.name} </option>
                                )
                                
                            })
                            }
                        </select>
                    </div>
                </div> 

                <button>Add The Product</button>

            </form>

       
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'categories'
        }
    ])
)(CreateProduct)
