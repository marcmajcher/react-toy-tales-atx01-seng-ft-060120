import React from 'react';

const ToyHeader = (props) => (
  <>
    <div id="toy-header">
      <img
        src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
        alt="toy-header"
      />{' '}
    </div>
    <h1>
      Search: <input type="text" name="searchTerm" onChange={props.handleSearch}></input>
    </h1>
  </>
);

export default ToyHeader;
