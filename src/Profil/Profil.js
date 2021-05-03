import React, { Component } from 'react';
import NewPost        from '../NewPost';
import MyPosts           from '../MyPosts';
import PostStore from '../stores/PostStore';
import { getPosts } from '../App';
var _ = require('lodash');

class Profil extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        };
        this.setPosts = this.setPosts.bind(this);
        this.removePost  = this.removePost.bind(this);
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

    componentDidUpdate() {
        if (!_.isEqual(PostStore.myPosts,this.state.posts)) {
            this.setPosts();
        }
    }
    
    setPosts() {
        console.log("set postovi");
        console.log(this.state.posts, PostStore.myPosts);
        this.setState({posts: PostStore.myPosts});
        console.log(this.state.posts, PostStore.myPosts);
    }

   

    removePost(id) {
       
        var tempArray  = this.state.posts.filter(post  => post.id !== id);
        console.log(id, tempArray);
        this.setState({
          posts: tempArray
        });
    }

    render() {
        return (
            <div className="body">
            

            <NewPost setPosts={this.setPosts}/>

            <MyPosts setPosts={this.setPosts} posts={this.state.posts}/>
            
          
        </div>
        );
    }
}

export default Profil;