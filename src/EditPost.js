import React          from 'react';
import InputFiled     from './InputField';
import SubmitButton   from './SubmitButton';
import UserStore      from './stores/UserStore';
import { Button } from 'react-bootstrap'
import PostStore from './stores/PostStore';
import { getPosts } from './App';
import AddEditPostModal from './AddEditPostModal';


class EditPost extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      description:  '',
      everyone: false,
      haveTaskFor: false,
      for: 'everyone',
      done: false,
      havedeadline: false,
      deadline: null,
      username: '',
      showEditPost: false,
    }
    this.setEditPost  = this.setEditPost.bind(this);
    this.setInputValue  = this.setInputValue.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.Save  = this.Save.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      id: '',
      title: '',
      description:  '',
      everyone: false,
      haveTaskFor: false,
      for: 'everyone',
      done: false,
      havedeadline: false,
      deadline: null,
      username: '',
      showEditPost: false,
    });
  }
  componentDidMount() {
    this.resetForm();
  }
 
  setEditPost(condition) {
    this.setState({showEditPost: condition});
  }

  setInputValue(property, val){
    this.setState({
      [property]:val
    });

  }

  resetForm(){
    this.setState({
        id: this.props.id,
        title: this.props.title,
        description:  this.props.description,
        everyone: this.props.everyone,
        haveTaskFor: this.props.for =='everyone' ? false : true,
        for: this.props.taskFor,
        done: this.props.done,
        haveDeadline: this.props.haveDeadline ? true: false,
        deadline: this.props.deadline,
        username: this.props.username,
        showEditPost: false,
    });
  }


  async Save(){
    if(!this.state.title){
      return;
    }

    if(!this.state.haveDeadline){
      this.state.deadline= null;
    }  

    

    try{
      let res = await fetch('/editPost', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:this.state.id,
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
        console.log("edited");
      
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

        this.props.setPosts();
       
        this.resetForm();
        
        //refresh
      }

      else if(result && result.success === false){
        
        alert(result.msg);
        console.log("Neradi edit!");
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
    console.log(this.state.haveTaskFor);
    return (
      <div >
        <div className="tu">
          
          <Button className="margintop" variant="outline-dark" size="sm" onClick = { () => {this.setEditPost(true); }}>Edit</Button>
          <AddEditPostModal 
            Post={this.Save}
            resetForm={this.resetForm}
            setInputValue={this.setInputValue}
            setEditPost={this.setEditPost}
            {...this.state}
          />
        </div>
        
      </div>
    );
  }
  
}

export default EditPost;
