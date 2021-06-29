
import './App.css';
import Map from './Components/Map/index';
import React ,{useEffect}from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import Home from './Components/Layers/Home'
import Sign from './Components/Login/index';
import axios from 'axios';
import {connect} from 'react-redux';
import Navigation from './Components/Navegador/Index.js'
import {
  SignIn,
  signUp,
  signOut,
  fetchAuth,
  
} from './store/actions/auth.actions';

import {
  changeDelivery,
  minusNroToBuy,
  addToCart,
  deleteAItem,
  changeNroToBuy
} from './store/actions/cart.actions';

import Tienda from './Components/Tienda/Tienda';



function App(props) {
  const {  cart , signIn, signUp, loadCartCache ,deleteAItem,minusNroToBuy,changeNroToBuy, changeDelivery, addToCart,  signOut , auth  ,fetchAuth  } = props;
// SETTING CACHE ? 
  useEffect(async ()=>{
    if(auth.token === null || auth.token === undefined){
      if(localStorage.getItem('cart-items')){
        const cacheItems = await JSON.parse(localStorage.getItem('cart-items') ) ;
        const cacheCount = await  parseInt( localStorage.getItem('cart-count'));
        const cacheTotal = await   parseInt(  localStorage.getItem('cart-total'));
      loadCartCache(cacheItems, cacheCount, cacheTotal);
      }
      if( localStorage.getItem('auth') ){
        const auth = await JSON.parse(localStorage.getItem('auth') ) ;
        fetchAuth(auth.profile.CORREO, auth.token);
       
        axios.defaults.headers.common =  {'Authorization': `Bearer ${auth.token}`}
      }
    }else{
      axios.defaults.headers.common =  {'Authorization': `Bearer ${auth.token}`}
    }
  },[props.props])
  return (
    <div className="App">
  <Router>
    <div>
    <Navigation deleteAItem={deleteAItem} minusNroToBuy={minusNroToBuy} totalToBuy={cart.total} count={cart.count} changeNroToBuy={changeNroToBuy} changeDelivery={changeDelivery} addToCart={addToCart}signOut={signOut} cart={cart.items} auth={auth} /> 

    </div>

<Route exact path='/mapa' render={ () => <Map  />}   />
<Route path='/sign' render={ () => <Sign signIn={signIn} signUp={signUp} auth={auth} />} />
<Route path='/tienda/:id' render={ props => <Tienda id={props.match.params.id}  props={props} addToCart={addToCart} cart={cart.items}  auth={auth}  /> } />
<Route path='/home/' render={ props => <Home />} /> 




</Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: (username,password) => dispatch(SignIn(username,password)),
    signUp: (newUser) => dispatch(signUp(newUser)),
    signOut: _ => dispatch(signOut()),
    initStateCart: _ => dispatch({type:'INIT_STATE_CART'}),
    fetchAuth: (id, token) => dispatch(fetchAuth(id,token)),
    addToCart: (items, product  , nroToBuy)  => dispatch(addToCart(items, product, nroToBuy)),
    changeDelivery:(items, product , newState ) => dispatch(changeDelivery(items, product, newState)),
    changeNroToBuy: (items, product , newState, idSubProduct ) => dispatch(changeNroToBuy(items, product, newState, idSubProduct)),
    minusNroToBuy : (items, product , idSubProduct ) => dispatch(minusNroToBuy(items, product, idSubProduct)),
    deleteAItem: (items, idSubProduct) => dispatch(deleteAItem(items, idSubProduct)),
    loadCartCache:  (  cacheItems,cacheCount,cacheTotal) => dispatch({ type: 'CACHE_CART_LOAD_SUCCESS',items: cacheItems,count: cacheCount,total: cacheTotal,}),

  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
