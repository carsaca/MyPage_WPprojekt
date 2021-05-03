import React, { Component } from 'react';
import { get } from 'lodash';
import UserStore from './stores/UserStore';

class UsersDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
    
  }

  async getAllUsers(){

    try{
        let res = await fetch('/getAllUsers', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });

    let result = await res.json();
    console.log(result);
    this.setState({
        users: result.data.filter(function(item) {
                return item.username !== UserStore.username
              })
      });
        
    }

    

    catch(e){
        console.log(e);
        console.log("neradi");
    }

  }

  render () {
    const { users } = this.state;

    let usersList = users.length > 0
    	&& users.map((item, i) => {
      return (
        <option key={i} value={item.username} >{item.username}</option>
      )
    }, this);

    return (
      <div>
        <select
          
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        >
          <option value="" selected disabled hidden>Choose here</option>
          {usersList}
        </select>
      </div>
    );
  }
}

export default UsersDropdown;