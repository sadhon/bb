import React from 'react';
import CategoryList from '../category/CategoryList';
import Navbar from '../layouts/Navbar';
import banar from '../../img/banar.jpg'
import ProductList from '../products/ProductList';
import {Link} from 'react-router-dom';
import BagProduct from '../products/BagProduct'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from '../../config/fbConfig';

function getSubTotal(list){
    var sum = 0;
    for (let i = 0; i< list.length ; i++)
    {
        sum += list[i].totalPrice;
    }

    return sum.toFixed(2);
}

class ClientView extends React.Component {
    state = {
        bag_products: [],
        showBazarList : true,
        showCatList: true,
        search: "",
        isSignedIn: false,
        signInClicked: false
    }

    update = (bagState) => {
        this.setState({
            bag_products: bagState
        })
    }


    //outh related codes 

    uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: '/',
        signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,

        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
            type: 'image', // 'audio'
            size: 'normal', // 'invisible' or 'compact'
            badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'BD',
            loginHint: '+8801XXXXXXXXX'
        }

        ]
    }


    componentWillMount = () => {
    firebase.auth().onAuthStateChanged(user => {
        this.setState(
            { isSignedIn : !! user }
        )
    })
    }

    controlSingIn = () => {
        this.setState({
            ...this.state,
            signInClicked: true

        })
    }

    hideFirebaseUi = (e) => {

        this.setState({
            ...this.state,
            signInClicked: false

        })
    }


    // set into local storage
    componentWillUpdate = (nextProps, nextState) => {
        localStorage.setItem('bag_products', JSON.stringify(nextState.bag_products));
      
    }

    //get from local storage
    componentWillMount = () => {
        localStorage.getItem('bag_products') && this.setState({
            bag_products: JSON.parse(localStorage.getItem('bag_products'))
        })
    }
    

    // fetch search text 
    fetchSearchText = (text) =>{
        this.setState({
            search: text.toLowerCase()
        }, ()=>{
            console.log("search bar text : ", this.state.search);
        })
    }

    //toggle Bazar List
    toggleBazarList = () => {
        this.setState({
            ...this.state,
            showBazarList: !this.state.showBazarList
        })
    }

    toggleCatList = () => {
        this.setState({
            ...this.state,
            showCatList : !this.state.showCatList

        }, function(){console.log("showcatlist: ", this.state.showCatList)})
    }

    // handle order
    handleOrder = () => {
        if(this.state.bag_products.length < 1 )
        {
            alert("Your bazar bag is empty. Please Choose items before placing an order.. Thanks");
        }
    }


    // increase product from bag 
    increase = (id) =>{
        const updated_bag = this.state.bag_products.map(bagProduct => {
            if(id === bagProduct.id){
                return {
                    ...bagProduct,
                    qty: bagProduct.qty + 1,
                    totalPrice : (bagProduct.qty + 1) * bagProduct.price

                }
            }

            return bagProduct;
        })

        this.setState(
            {bag_products : updated_bag}
        )
    }


    // decrease by id
    decrease = (id, qty) =>{

        // if bag product qty === 1 then no need to decrease just delete it
        // otherwise decrease it

        if(qty === 1){
            const updated_bag = this.state.bag_products.filter(bagProduct => bagProduct.id !== id);
            this.setState(
                {bag_products : updated_bag}
            )

        }else{
            const updated_bag = this.state.bag_products.map(bagProduct => {
 
                if(id === bagProduct.id){
                    return {
                        ...bagProduct,
                        qty: bagProduct.qty - 1,
                        totalPrice : (bagProduct.qty - 1) * bagProduct.price
                    }
                }
                return bagProduct;
            });
            
            this.setState(
                {bag_products : updated_bag}
            )
        }
    }

    render(){
        if(this.props.match.params.pp){
            alert(this.props.match.params.pp);
        }
        return (
            
            <div className='main-part'>
                <div className="">
                    <Navbar  controlSingIn={this.controlSingIn} toggleCatList={this.toggleCatList} fetchSearchText={this.fetchSearchText} />
                    <div className={" sidebar-container " + ( this.state.showCatList ? " left-0 " : " left-230 " ) }>
                            <CategoryList />
                    </div>

                    


                       {/* content container */}
                    <div 
                    className={"content-container " + ( this.state.showCatList ? " margin-left-230 " : " margin-left-0 " )} >
       
                        <div className='content-container-inner'>
                            <div className="product-ads">
                                <img className='banar' src={banar} alt=""/>
                            </div>
            
                            {
                                this.props.match.params.cat_sub ?
                                    (<ProductList update={this.update} productsInsideBag={this.state.bag_products} search={this.state.search} cat_sub={this.props.match.params.cat_sub} /> ) : 
                                ( <p className="center-align">Select What type of product you need from side bar menu</p> )
                                
                            }

                        </div>

        
                    </div>
        
        
                    {/* bazar bag */}
                    <div
                    className="bag-product-list "  >
                        {
                            this.state.bag_products.length > 0 ? 
                            (    
                                <div className="bag-header"  onClick={this.toggleBazarList} >          
                                    <div className="cross">
                                        {(
                                            this.state.showBazarList ? "close" : "see bazar Item('s)"
                                        )}
                                    </div>
                                    <span className='item'>Items: { this.state.bag_products.length }</span>
                                </div>     
                            ) : ("")
                        }

         
                        <ul 
                        className={"bag-products"  + ( this.state.showBazarList ? " show" : " hide" )}>
                        
                            {
                                this.state.bag_products && this.state.bag_products.map( product => {
                                    return (
                                        <BagProduct 
                                        increase={this.increase} 
                                        decrease={this.decrease} 
                                        product={product} 
                                        key={product.id} /> 
                                        )
                                })
                            }
                        </ul>
    
                        <div className="summary">
                            <div className="bottom">
                                {
                                    this.state.bag_products.length > 0 ?
                                    (
                                        <div>
                                            <button onClick={this.handleOrder}>Order Now</button>
                                            <span>  ৳  {getSubTotal(this.state.bag_products)}</span>
                                        </div>
                                        
                                    )
                                    :
                                    (
                                        <Link to="/education_old_book" className="start-bazar">Start bazar</Link>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                    {/* End bazar bag here */}


                    {/* Start Oauth provider */}

                    {
                        this.state.signInClicked && !this.state.isSignedIn ? (
                            <div onClick={(e) => this.hideFirebaseUi(e)} className="styled-firebase-auth-container">
                                <StyledFirebaseAuth 
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                                />
                            </div>


                        ): ('')
                    }

                    

                </div>
            </div>
        )

    }
  
}

export default ClientView
