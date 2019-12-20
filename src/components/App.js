import React, { Component } from 'react';
import './App.css';
import Posts from './Post';
import NestedList from './NestedList';

//import { render } from '@testing-library/react';

//const API = 'https://jsonplaceholder.typicode.com/posts/1';   //jeden post
//const API = 'https://jsonplaceholder.typicode.com/posts';   //wszystkie
//const API = 'https://jsonplaceholder.typicode.com/posts?userId=1';

let othersPos = 0;

class App extends Component {

  state = {
    posts: [],        //wszystkie pobrane wiadomości
    postsWiew: [],    //wiadomości do pokazania 
    isLoaded: false,  //pierwsze załadowanie postów
    quantity: 0,      //ilość pobranych wiadomości
    users: [],        //tablica z ilością "User Id"
    filtr: [0],       //aktualne filtrowanie wiadomości względem użytkowników
  }
  
  
  getNewPost = () => {
    let nrPos = this.state.quantity +1;
    //console.log("post nr: ", nrPos);
    const API = `https://jsonplaceholder.typicode.com/posts/${nrPos}`; 
    fetch(API)
    .then(response => response.json())
    .then(json => {  
      //console.log(json);
      json.open = false; //dodaje kolejną właściwość
      //console.log(json);
      this.setState( prevState => ({
        posts: [...prevState.posts, json],
        isLoaded: true,
        quantity: prevState.quantity+1,
      }))

      if(this.state.users.indexOf(json.userId) === -1) {
        this.setState( prevState => ({
          users: [...prevState.users, json.userId],
        }))
      }

      this.handleUserFilter(this.state.filtr);

      if(othersPos) {
        othersPos--
        this.getNewPost()
      }

    })
    .catch(error => console.error("Nie udało sie wczytać API"))
  }

  getNew10Post= () => {
    if(othersPos) return;
    othersPos = 9;
    this.getNewPost();
  }

  // componentDidMount() {
  //   this.getNewPost();
  // }

  handleUserFilter = (filtr) => {
    //console.log(filtr);
    if(filtr.indexOf(0) > -1) {
      //console.log("Jest 0");
      this.setState( prevState => ({
        postsWiew : prevState.posts,
      }))
      return;
    }

    let postsWiew = [];

    filtr.forEach((el)=> {
      if(filtr.indexOf(el) > -1) { //jeżeli istnieje element w tablicy
        //console.log("Jest", el);
        postsWiew = [...postsWiew, ...this.state.posts.filter(post => post.userId === el)]
        //console.log(postsWiew);
      }
    })

    this.setState({
       postsWiew,
       filtr,
    })
  }

  render() {
    //const newPosts = this.state.posts.filter(post => post.open === true)

    return (
      <div className="App">
        <div className="left-menu">
          <NestedList 
            getNewPost={this.getNewPost}
            getNew10Post={this.getNew10Post}
            lenPosts={this.state.posts.length}
            users = {this.state.users}
            userFilter = {this.handleUserFilter}
          />
        </div>
        <div className="post-list">
          <h3>Wyświetlanych wiadomosci: {this.state.postsWiew.length}</h3>
          <Posts posts = {this.state.postsWiew}/>
        </div>
      </div>
    );
  }
}

export default App;
