import React          from 'react';
import InputFiled     from './InputField';
import SubmitButton   from './SubmitButton';
import UserStore      from './stores/UserStore';
import { Button } from 'react-bootstrap'
import PostStore from './stores/PostStore';
import { getPosts } from './App';
import AddNewPostModal from './AddNewPostModal';


class NewPost extends React.Component{

  constructor(props){
    super();
    this.state = {
      title: '',
      description:  '',
      everyone: false,
      haveTaskFor: false,
      for: 'everyone',
      done: false,
      havedeadline: false,
      deadline: null,
      username: '',
      buttonDisabled: false,
      showAddNewPost: false,
    }
    this.setAddNewPost  = this.setAddNewPost.bind(this);
    this.setInputValue  = this.setInputValue.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.Post  = this.Post.bind(this);
  }

 
  setAddNewPost(condition) {
    this.setState({showAddNewPost: condition});
  }

  setInputValue(property, val){
    this.setState({
      [property]:val
    });

    console.log(this.state[property]);
  }

  resetForm(){
    this.setState({
      username: '',
      title: '',
      description:  '',
      everyone: false,
      haveTaskFor: false,
      for: 'everyone',
      done: false,
      havedeadline: false,
      deadline: null,
      buttonDisabled: false,
      showAddNewPost: false,
    });
  }


  async Post(){
    if(!this.state.title){
      return;
    }

    if(!this.state.havedeadline){
      this.state.deadline= null;
    }

    console.log(this.state.for);
    

    

    try{
      let res = await fetch('/addPost', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: UserStore.username,
          title: this.state.title,
          description: this.state.description,
          deadline: this.state.deadline,
          everyone: this.state.everyone,
          taskFor: this.state.for
          
        })
      });

      let result = await res.json();
      console.log(result);

      if(result && result.success){
        console.log("posted");
        
        let res = this.props.allPosts ? (await fetch('/getAllPost', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          
        })
        )  :  ( await fetch('/getMyPost', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            username: UserStore.username
          })
        })
        )
       
      
        getPosts().then(() => this.props.setPosts());
       
        this.resetForm();
        
        //refresh
      }

      else if(result && result.success === false){
        
        alert(result.msg);
        console.log("Opet ne radi!");
      }
    }

    catch(e){
      console.log(e);
      console.log("neradi");
      
      this.setState({
        buttonDisabled: false
      })
    }
  }


  render() {
    return (
      <div className="newPostContainer">
        <div className="newPost">
          
          <Button className="margintop" variant="outline-dark" size="sm" onClick = { () => {this.setAddNewPost(true); }}>New task</Button>
          <AddNewPostModal 
            Post={this.Post}
            resetForm={this.resetForm}
            setInputValue={this.setInputValue}
            setAddNewPost={this.setAddNewPost}
            {...this.state}
          />
        </div>
        
      </div>
    );
  }
  
}

export default NewPost;
