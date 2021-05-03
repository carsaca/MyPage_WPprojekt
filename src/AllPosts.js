import React          from 'react';
import UserStore      from './stores/UserStore';
import DeleteButton   from './DeleteButton'
import ToggleButton from './ToggleButton';
import EditPost       from './EditPost';
import PostStore from './stores/PostStore';
var _ = require('lodash');


function dateMySQL_toUTC(date){
  const splitDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  var newDate = new Date(splitDate);

  return Date.parse(newDate.toUTCString());

}


class AllPosts extends React.Component{

  constructor(props){
    super()
    this.state = {
        buttonDisabled: false,
    };

    this.SaveState = this.SaveState.bind(this);
  }

    
    async SaveState(id){
  
      if(!id){
        console.log("Greška s id-om")
        return;
      }
  
      try{
        let res = await fetch('/toggleDonePost', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
          })
        });
  
        let result = await res.json();
  
        if(result && result.success){
          console.log("changed");
        
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
        }
  
        else if(result && result.success === false){
          alert(result.msg);
          console.log("opet ne radi");
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
      <div className="postContainer">

{
        this.props.posts && this.props.posts.map(post => 
          <div className='post' key={post.id}>
            <div className='leftside'>

              <div className='postText'>{post.title}</div>
              <div className='postDescription'>{post.description}</div>

              <div className='userAndDate'>
                <div className='postUsername'>{post.username}</div>

                

                
                
              </div>

              <div className="flex">

              <ToggleButton 
                className="btn btn-outline-dark btn-sm"
                id={post.id}
                done={post.done}
                text="Done!" 
                SaveState={this.SaveState}
              />

              {post.deadline!=null && (
                <div className="deadline">
                  <div>Deadline: &nbsp;</div>
                  <div>
                    {new Intl.DateTimeFormat("default", {
                      year: 'numeric', month: 'short', day: '2-digit',
                      hour: 'numeric', minute: 'numeric', 
                      hour12: false,
                      
                    }).format(dateMySQL_toUTC(post.deadline))}
                  </div>
                </div>
                )
                }

                </div>

            </div>

            

            <div className='rightside'>


            { _.isEqual(post.username, UserStore.username)   &&  (
              <EditPost
              setPosts={this.props.setPosts}
              {...post}
              />
            )}
              
              <div className="tu">
            { _.isEqual(post.username, UserStore.username)   &&  (
                <DeleteButton
                    className="btn btn-outline-dark btn-sm"
                    text='Delete'
                    id={post.id}
                    disabled={this.state.buttonDisabled}
                    onClick={ () => {
                      this.Delete(post.id);
                    }
                  }
                />
              )}

            </div>

              <small>
                  {new Intl.DateTimeFormat("default", {
                    year: 'numeric', month: 'short', day: '2-digit',
                    hour: 'numeric', minute: 'numeric', 
                    hour12: false,
                    
                  }).format(dateMySQL_toUTC(post.date))}
                </small>

                
            </div>
            
          </div>
          )
        }    
        
      </div>
    );
      
    
    
  }
  
}

export default AllPosts;
