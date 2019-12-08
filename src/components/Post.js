import React from 'react';
import "./Post.css";

const Post = props => (
    <li>Słowo po angielsku: <strong>{props.title}</strong>.
    Tłumaczenie: {props.body} </li>
)

export default Post;