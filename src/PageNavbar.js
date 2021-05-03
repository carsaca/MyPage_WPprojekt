import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
  import Home from './Home/Home';
  
  import SubmitButton   from './SubmitButton';
  import UserStore      from './stores/UserStore';

class PageNavbar extends React.Component{

    async LogOut() {
    
        try{
          let res = await fetch('/logout', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    
          let result = await res.json();
    
          if(result && result.success){
            UserStore.isLoggedIn = false;
            UserStore.username = '';
          }
    
        }
        catch(e){
          console.log(e);
        }
      }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="neznam">
                       
                            <Navbar  variant="dark" expand="lg" sticky="top">
                              
                                <Navbar.Brand href="/home">MYPAGE</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">

                                    
                                        <Nav.Link>
                                          <Link to="/home">
                                            Home
                                          </Link>
                                        </Nav.Link>
                                        <Nav.Link>
                                          <Link to="/profil">
                                            Profil
                                          </Link>
                                        </Nav.Link>
                                        <div className='navbar username'>
                                        {UserStore.username}
                                        </div>
                                        <Button href="/login" variant="outline-light" size="sm" onClick = { () => this.LogOut()}>Log out</Button>
                                    

                                    </Nav>
                                </Navbar.Collapse>
                                
                            </Navbar>
                            
                            <br />
                            
                       
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default PageNavbar;