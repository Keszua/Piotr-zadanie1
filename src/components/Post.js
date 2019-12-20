import React from 'react';
import "./Post.css";

const Post = props => (
    <li className="post">
        <div>
        <h3>{props.title}</h3>
        User Id: {props.userId}  
        <br/>  
        {props.body} 
        </div>
    </li>
)


const Posts = props => (


    <ul className="List">
        {props.posts.map(el => (
            <Post key={el.id} userId={el.userId} title={el.title} body={el.body}/>
        ))}
    </ul>
)

export default Posts;