import React, { Component } from 'react';
import './App.css';
import Post from './Post';
//import { render } from '@testing-library/react';

class App extends Component {

  state = {
    posts: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/2')
    .then(response => response.json())
    .then(json => console.log(json))
    .then(posts => {
      
      console.log(posts)
      // this.setState({
      //   posts,
      //   isLoaded :true
      // })
      //skonczylem na filmiku 77 23:55
    })
  }

  render() {
    const posts = this.state.posts.map(el => (
      <Post key={el.id} title={el.title} body={el.body}/>
    ))
    return (
      <ul className="List">
        {this.state.isLoaded ? posts : "Loading data..."}
  
      </ul>
    );
  }
}

export default App;
