import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Listview from './Component/Layout/Listview';
import Editview from './Component/Layout/Editview';
import Createview from './Component/Layout/Createview';
import Noteview from './Component/Layout/Noteview';
import Loginview from './Component/Layout/Loginview';

// axios

import axios from 'axios'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: '',
      textBody:'',
      username: '',
      password: '',
      isSignedIn: false,
      uid: ''
    };
  }

  
  componentDidUpdate = () => {
    //this.readOne(this.state.uid)
  }

  componentDidMount = () => {
    console.log(this.state.uid)
    this.readOne(this.state.uid);
  }

  //auth
  
  handNewUser = (event) => {
    event.preventDefault();

    axios
      .post('https://thawing-stream-63814.herokuapp.com/api/auth/register', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })

      this.setState({
        username: '',
        password: '',
      })

  }


  handleReturningUser = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/auth/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        this.setState({
          uid: response.data.uid
        })
        this.readOne(this.state.uid);
        this.loginHandler('Logged In')
        // document.window.sessionStorage.accessToken = response.body.access_token;
        console.log(localStorage.getItem('token'))
      })
      .catch(err => {
        console.log(err)
      })

      this.setState({
        username: '',
        password: '',
      })

  }


  fetch = () => {
    console.log("fetching")
    axios
      .get('https://thawing-stream-63814.herokuapp.com/api/users', {
        headers: { "authorization": localStorage.getItem('token')}
      })
        .then(response => {
          console.log(response)
          if(response.data){
            this.setState({
              isSignedIn: true
            })
          }
        })
        .catch(err => {
          console.log(err.message)
        })
  }

  loginHandler = (loginBool) =>{
    if(loginBool === 'Logged In'){
      this.setState({
        isSignedIn: true,
      })
    }
  }

  logOut = () =>{
    console.log("logged out")
    this.setState({
      isSignedIn: false,
    })
  }
  //authout

  //mongo

  create = event => {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/notes',
      data: {
        title: this.state.title,
        note: this.state.textBody,
        uid: this.state.uid,
      }
    });

    this.setState({
      title: '',
      textBody: ''
    });

  }

  
  // read = () => {
  //   axios
  //     .get('https://thawing-stream-63814.herokuapp.com/api/notes')
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState({
  //         notes: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }

  readOne = (_id) => {
    axios
      .get(`http://localhost:5000/api/notes/${_id}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          notes: response.data
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  update = (_id) =>{
    console.log(_id)
    axios
      .put(`https://thawing-stream-63814.herokuapp.com/api/notes/${_id}`, {
          title: this.state.title,
          note: this.state.textBody
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      });
      
  }

  delete = (_id) => {
    console.log("hr")
    axios
    .delete(`https://thawing-stream-63814.herokuapp.com/api/notes/${_id}`)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }



  //mono ends

  handleTaskChange = event => {
    event.preventDefault();
    this.setState({[event.target.name] : event.target.value});
  } 


  // handleRequest = () =>{ 
  //   console.log('fire')
  //   let newNote = {
  //     title: this.state.title,
  //     textBody: this.state.textBody,
  //     id: this.state.notes.length
  //   }

  //   let newNoteArray = [...this.state.notes]
  //   newNoteArray.push(newNote)
  //   this.setState({
  //     notes: newNoteArray,
  //     title: '',
  //     textBody: ''
  //   })
  //   }

  handleDelete = (id) => {
    var newList = this.state.notes;
    newList = newList.filter(item => (item.id.toString() !==  id.toString()) )
    console.log('newlist', newList);
    this.setState({
      notes: newList
    });
  }

  handleEdit = (id) => {
    let note = this.state.notes.filter(item => (item._id.toString() ===  id) )
    console.log("not",note)
    this.setState({
      title: note[0].title,
      textBody: note[0].note,
      id: note[0].id
    })
  }

  
  handleUpdate = (id) =>{ 
    let newNotes = [...this.state.notes];
      newNotes[id].title = this.state.title;
      newNotes[id].textBody = this.state.textBody;
    console.log('nn2',newNotes)
    this.setState({
      notes: newNotes,
      title: '',
      textBody: ''
    });
      
  }
  


  render() {
    if(this.state.isSignedIn){
      console.log(this.state.uid);
      return(
        <div className="container-fluid">
          <Route exact path="/" render={ (props) =>  <Listview {...props} readOne={this.readOne} uid={this.state.uid} notes={this.state.notes} fetch={this.fetch} logOut={this.logOut} /> } />
          <Route path="/edit/:id" render={ (props) =>  (<Editview {...props} fetch={this.fetch} logOut={this.logOut} id={props.match.params.id} handleUpdate={this.update}  handleTaskChange= {this.handleTaskChange} handleEdit={this.handleEdit} title={this.state.title} textBody={this.state.textBody} />  )  } />
          <Route path="/note/:id" render={ (props) =>  (<Noteview {...props} fetch={this.fetch} logOut={this.logOut} delete={this.delete}    note={this.state.notes.filter(item => (item._id.toString() ===  props.match.params.id) )} />  )  } />
          <Route path="/create" render={ (props) =>  <Createview {...props} fetch={this.fetch} logOut={this.logOut} title={this.state.title} textBody={this.state.textBody} handleRequest = {this.create}  handleTaskChange= {this.handleTaskChange}/> } />
        </div>
      );
    }
    else{
      return(
        <div>
          <Loginview fetch={this.fetch} username={this.state.username} password={this.state.password}  handleTaskChange={this.handleTaskChange} handNewUser={this.handNewUser} handleReturningUser={this.handleReturningUser} loginHandler={this.loginHandler} />
        </div>
      )
    }
  }
}

export default App;
