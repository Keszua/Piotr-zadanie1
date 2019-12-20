import React from 'react';
import "./Post.css";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const PostBody = props => (
    <>
        <br/> 
        {/* User Id: {props.userId}   */}
        <br/>
        {props.body}
    </>
)


class Post extends React.Component {

    state = {
        show: false,
    }
 
    handleToogleShow = () => {
        console.log("Przycisk")
        this.setState( prevState => ({
             show: !prevState.show,
        }))
    }

    render() {

        return(
            <li className="post">
                <div>
                    <button onClick={this.handleToogleShow} > {this.state.show ? <ExpandLess /> : <ExpandMore />} 
                    </button>
                    <strong>{this.props.title}</strong> User Id: {this.props.userId}  
                    {this.state.show ? <PostBody userId={this.props.userId} body={this.props.body}  /> : null }
                </div>
            </li>
        )
    }
}


const Posts = props => (

    <ul className="List">
        {props.posts.map(el => (
            <Post key={el.id} userId={el.userId} title={el.title} body={el.body}/>
        ))}
    </ul>
)

export default Posts;