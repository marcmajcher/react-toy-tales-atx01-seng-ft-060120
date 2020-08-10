import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: '',
    image: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleNewToy(this.state.name, this.state.image);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
          />
          <br />
          <input
            type="text"
            onChange={(e) => {
              this.setState({ image: e.target.value });
            }}
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Create New Toy"
            className="submit"
          />
        </form>
      </div>
    );
  }
}

export default ToyForm;
