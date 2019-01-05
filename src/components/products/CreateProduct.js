import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addProduct } from '../../store/actions/productActions';
import firebase from '../../config/fbConfig';


class CreateProduct extends Component {
    state ={
        subCat : this.props.match.params.subCat,
        image: null,
        url: '',
        progress : 0,
        imageName: '',
        uploadBtnClicked: false
     }

    // for form submission
    handleSubmit = (e) => {
        e.preventDefault();
       this.props.addProduct(this.state);
       this.props.history.push("/dashboard");

       console.log("  form state  ", this.state)
       
    }

    // take input value and set state
    inputChangeHandler = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    // take an image when onchage happens
    takeAnImage = (e) => {
        const image = e.target.files[0];
        this.setState({image});
        console.log("image : ", image)

    }

    // upload  the image when upload button is clicked
    uploadImage = (e) => {
        e.preventDefault();

        const {image} = this.state;
        const storage = firebase.storage();

        if(image && this.state.imageName){
            this.setState({uploadBtnClicked: true})
            const uploadTask = storage.ref( this.state.subCat + '/' + this.state.imageName ).put(image);
            uploadTask.on('state_changed', 
                (snapshot)=>{
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100 )
                    this.setState({ progress })
                },
                (error)=>{
                    console.log(error);
                },
                ()=>{
                    storage.ref(this.state.subCat).child(this.state.imageName).getDownloadURL()
                    .then((url)=>{
                        this.setState({url},function(){ console.log("state url check ",this.state)});
                    })
                }
            );
        }else{
            alert("Choose an image and Give it a name");
        }

    }

  render() {

    
    return (
      <div className="container">
            <form onSubmit={this.handleSubmit}>
                <legend><h4 className='center-align'>Create a new product</h4></legend>
   

                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="text" onChange={this.inputChangeHandler} id="name" placeholder="Product name " />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        {
                            this.state.progress === 100 ?
                             ( <img src={this.state.url} alt={this.state.imageName} style={{'height':'100px', 'width':'100px'}} /> ) 
                             :
                             (" ")

                        }

                        <div className={"product-img-container " + (this.state.uploadBtnClicked ? " hide " : " show ")}>
                            <p>uploading complete {this.state.progress } </p>
                            <input required type="file" onChange={this.takeAnImage} id="image"  />
                            <input required type="text" placeholder="Image Name" id="imageName" onChange={this.inputChangeHandler} />
                            <button  className="btn" onClick={this.uploadImage}> Upload Image </button>
                        </div>

                   
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="text" onChange={this.inputChangeHandler} id="bnName" placeholder="Product name in Bengali" />
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <textarea  required onChange={this.inputChangeHandler} id="desc" placeholder="Product Description" className="materialize-textarea"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <textarea  required onChange={this.inputChangeHandler} id="bnDesc" placeholder="Product Description in Bengali" className="materialize-textarea"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="text" onChange={this.inputChangeHandler} id="measurementUnit" placeholder="Measurement  unit" />
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="text" onChange={this.inputChangeHandler} id="price" placeholder="Price" />
                    </div>

                </div>

                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="number" onChange={this.inputChangeHandler} id="perUnit" placeholder="Per Unit" />
                    </div>
                </div>

                <div className="row">
                    <div className="col m6 s12 input-field ">
                        <input required type="text" onChange={this.inputChangeHandler} id="keywords" placeholder="Product Keywords" />
                    </div>
                </div>

                <button className="btn">Add The Product</button>
            </form>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) =>{
    return {
        addProduct: (product)=>dispatch(addProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(CreateProduct)
