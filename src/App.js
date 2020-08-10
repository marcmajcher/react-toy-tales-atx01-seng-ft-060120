import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

const url = 'http://localhost:3000/toys';

class App extends React.Component {
  state = {
    display: false,
    toys: [],
    searchTerm: '',
  };

  componentDidMount() {
    this.loadToys();
  }

  loadToys() {
    fetch(url)
      .then((res) => res.json())
      .then((toys) => this.setState({ toys }));
  }

  handleSearch = (e) => {
    console.log('search for ', e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  handleLike = (id) => {
    let thisToyLikes;

    const toys = this.state.toys.map((toy) => {
      const newToy = { ...toy };
      if (id === newToy.id) {
        newToy.likes += 1;
        thisToyLikes = newToy.likes;
      }
      return newToy;
    });
    this.setState({ toys });

    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ likes: thisToyLikes }),
    }).then(this.loadToys());
  };

  handleDelete = (id) => {
    const toys = this.state.toys.filter((toy) => toy.id !== id);
    this.setState({ toys });

    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Accepts: 'application/json',
      },
    }).then(this.loadToys());
  };

  handleNewToy = (name, image) => {
    const newToy = { name, image, id: this.getNextId(), likes: 0 };
    this.setState({ toys: [...this.state.toys, newToy] });
    this.fetchURL('POST', newToy);
  };

  // helper functions

  getNextId() {
    const highestId = this.state.toys.reduce(
      (a, c) => (c.id > a ? c.id : a),
      0
    );
    return highestId + 1;
  }

  fetchURL(method, data) {
    fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.loadToys());
  }

  render() {
    return (
      <>
        <Header handleSearch={this.handleSearch} />
        {this.state.display ? (
          <ToyForm handleNewToy={this.handleNewToy} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          handleDelete={this.handleDelete}
          handleLike={this.handleLike}
          toys={this.state.toys.filter(toy => toy.name.match(this.state.searchTerm))}
        />
      </>
    );
  }
}

export default App;
