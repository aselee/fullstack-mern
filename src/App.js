import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {

  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all exising data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if(!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  //always kill a process everytime we are done using it
  componentWillUnmount() {
    if(this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  // in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our database
  getDataFromDB = () => {
    fetch("/api/getData")
    .then(data => data.json())
    .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base



  render() {
    return <div>I'M READY TO USE THE BACK END APIIISSSS!!! :-)</div>;
  }
}

export default App;

