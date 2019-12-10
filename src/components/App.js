import React, { Component } from 'react';
import './App.css';
import Post from './Post';
//import { render } from '@testing-library/react';

//const API = 'https://jsonplaceholder.typicode.com/posts/1';   //jeden post
const API = 'https://jsonplaceholder.typicode.com/posts';   //wszystkie
//const API = 'https://jsonplaceholder.typicode.com/posts?userId=1';

class App extends Component {

  state = {
    posts: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(json => {  
      
      //dla jednego postu:
      // this.setState( prevState => ({
      //   //posts: prevState.posts.push(json),  //Dla czego takie dodawanie do tablicy nie działa?
      //   posts: [...prevState.posts, json],    //to działa
      //   //posts: prevState.posts.concat(arr), //to też działa
      //   isLoaded: true
      // }))

      //dla kilku postów:
        this.setState( {
          posts: json,
          isLoaded: true
        })
        
    })
    .catch(error => console.error("Nie udało sie wczytać API"))
  }


  render() {
    //const posts = <Post />

     const posts = this.state.posts.map(el => (
        <Post key={el.id} userId={el.userId} title={el.title} body={el.body}/>
       //<Post key={el.id} />
       ))
    return (
      <>
        <ul className="List">
          {this.state.isLoaded ? posts : "Loading data..."}
    
        </ul>
      </>
    );
  }
}

export default App;
