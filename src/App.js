import React, { Component } from 'react';
import { reaction } from 'mobx';
import { render } from '@testing-library/react';
import { observer} from 'mobx-react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

// moje komponente
import UserStore      from './stores/UserStore';
import Home           from './Home/Home';
import Profil from './Profil/Profil';
import LoginForm      from './LoginForm';
import RegisterForm   from './RegisterForm';
import PageNavbar         from './PageNavbar';
import './App.css';
import PostStore from './stores/PostStore';


export async function getPosts() {
  try {
    let res3 = await fetch('/getAllPost', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
    });
    let res2 = await fetch('/getMyPost', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: UserStore.username
      })
    });
    
   
  
    let result3 = await res3.json();
    let result2 = await res2.json();
    PostStore.allPosts = result3.data.reverse();
    PostStore.myPosts = result2.data.reverse();
  } catch (error) {
    console.log(error);
  }
}



async function getData() {
  try{

    let res = await fetch('/isLoggedIn', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let result = await res.json();

    if(result && result.success){
      UserStore.loading = false;
      UserStore.username = result.username;
      UserStore.isLoggedIn = true;
    
        
      
    }

    else{
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

    if  (result.success) {
      getPosts();
    }

  }
  catch(e){
    UserStore.loading = false; 
    UserStore.isLoggedIn = false;
  }
}




class App extends React.Component{
  
  componentDidMount() {
    getData();
  }

  render() {

    if(UserStore.loading){
      return(
        <div className= 'app'>
          <div className= 'container'>
            Loading, please wait..
          </div>
        </div>
      );
    }
    else {

      if(UserStore.isLoggedIn){
        return (
          <div className = 'app'>            
            <PageNavbar/>
            <Switch>
              <Route path="/profil" component={Profil} />
              <Route path="/" component={Home}/>             
            </Switch>                    
          </div>
          
        );
      }

      return(
        <div className = 'app'>
          <div className= 'container'>

          

          <Switch>
            
            <Route component={RegisterForm} exact path='/register'/>
            <Route component={LoginForm} path='/'/>
          </Switch>

          

          </div>
        </div>
      );
    }

  }
}

export default observer(App);
