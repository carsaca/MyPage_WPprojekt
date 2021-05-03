import React          from 'react';

import NewPost        from '../NewPost';
import AllPosts        from '../AllPosts';
import UserStore      from '../stores/UserStore';
import PostStore from '../stores/PostStore';
import { getPosts } from '../App';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        posts: []
    };
    this.setPosts = this.setPosts.bind(this);
}
  

componentDidMount() {
  if (!PostStore.myPosts.length) {
    getPosts().then(() => {
        this.setPosts();
    });
  } else {
      this.setPosts();
  }
}

setPosts() {
  this.setState({posts: PostStore.allPosts});
}

  render() {
      return (
        <div className="body">
            

            <NewPost allPosts setPosts={this.setPosts} />
            
            <AllPosts posts={this.state.posts} />
          
        </div>
      );
    
    
  }
  
}

export default Home;
