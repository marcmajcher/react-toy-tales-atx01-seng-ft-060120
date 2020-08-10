import React, { Component } from 'react';

class ToyCard extends Component {
  
  render() {
    const toy = this.props.toy;

    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={() => this.props.handleLike(toy.id)} className="like-btn">
          Like{' '}
          <span role="img" aria-label="like">
            ❤️
          </span>
        </button>
        <button onClick={() => this.props.handleDelete(toy.id)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }
}

export default ToyCard;
