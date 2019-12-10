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

export default Post;