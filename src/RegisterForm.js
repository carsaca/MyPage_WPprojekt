import React         from 'react';
import InputFiled     from './InputField';
import SubmitButton   from './SubmitButton';
import { Link } from 'react-router-dom'; 



class RegisterForm extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatedPassword: '',
      buttonDisabled: false
    }

    
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length > 30){
      return;
    }
    this.setState({
      [property]:val
    })
  }

  resetForm(){
    this.setState({
      email:'',
      username: '',
      password: '',
      repeatedPassword: '',
      buttonDisabled: false
    })
  }

async Register(){
    if(!this.state.email){
        return;
      }
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }
    if(!this.state.repeatedPassword){
        return;
    }
    if(this.state.password !== this.state.repeatedPassword){
        return;
        
    }

    this.setState({
      buttonDisabled: true
    })

    try{
      let res = await fetch('/checkIfUserExist', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          
        })
      });

      let result = await res.json();

      if(result && result.success){
        // spremi u bazu
        try{
            let res = await fetch('/register', {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                
              })
            });
      
            let result = await res.json();
            console.log(result);
            console.log("result");
      
            if(result && result.success){
              window.location = "/home"
            }
            else if(result && result.success === false){

              alert(result.msg);

            }
          }
      
          catch(e){
            console.log(e);
            
          }

          
        
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
            <div className="registerForm">
              <div className='title'>
                <h1>MYPAGE</h1>
              </div>
              
              <div className="mediumtext">
                Sign in
              </div>

              <InputFiled
                  className="input"
                  type="email"
                  placeholder = 'e-mail'
                  value={this.state.email ? this.state.email : ''}
                  onChange={(val) => this.setInputValue('email', val)}
      
              />
      
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
      
              <InputFiled
                  className="input"
                  type='password'
                  placeholder = 'Repeat password'
                  value={this.state.repeatedPassword ? this.state.repeatedPassword : ''}
                  onChange={(val) => this.setInputValue('repeatedPassword', val)}
              />
      
              <SubmitButton
                  text='Register'
                  disabled={this.state.buttonDisabled}
                  onClick={ () => this.Register()}
              />
              
              <div className="smalltext">
                <div>
                  Already have account? &nbsp;
                  <Link to='/login'>Log in</Link> 
                </div>
              </div>
      
            </div>
        
        
        );
    
    
  }
  
}

export default RegisterForm;
