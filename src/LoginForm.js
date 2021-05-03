import React          from 'react';
import InputFiled     from './InputField';
import SubmitButton   from './SubmitButton';
import UserStore      from './stores/UserStore';
import { Link } from 'react-router-dom'; 

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length > 15){
      return;
    }
    this.setState({
      [property]:val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }



  async LogIn(){
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try{
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if(result && result.success){
        UserStore.username = result.username;
        console.log("UserStore.username login");
        console.log(UserStore.username);
        UserStore.isLoggedIn = true;

        
      }

      else if(result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }
    }

    catch(e){
      console.log(e);
      this.resetForm();
    }
  }


  render() {
    return (
      <div className="loginForm">
        <div className='title'>
          <h1>MYPAGE</h1>
        </div>
        

        <div className="mediumtext">
          Log in
        </div>
        
        <InputFiled
            className="input"
            type='text'
            placeholder = 'Username'
            value={this.state.username ? this.state.username : ''}
            onChange={(val) => this.setInputValue('username', val)}
        />

        <InputFiled
            className="input"
            type='password'
            placeholder = 'Password'
            value={this.state.password ? this.state.password : ''}
            onChange={(val) => this.setInputValue('password', val)}
        />

        <SubmitButton
            
            text='Login'
            disabled={this.state.buttonDisabled}
            onClick={ () => this.LogIn()}
        />
        
        <div className="smalltext">
          <div>
            Don't have account? &nbsp;
            <Link to='/register'>Register</Link> 
          </div>
        </div>

      </div>
    );
  }
  
}

export default LoginForm;
