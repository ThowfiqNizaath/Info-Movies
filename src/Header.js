import React, { useState } from 'react'

const Header = ({searchMovies , searchTerm,setSearchTerm,viewFavorites,setViewFavorites , handleBack , movies}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
     searchMovies(searchTerm);
     setSearchTerm('')
  };

  const handleViewFavorites = () => {
    setViewFavorites(!viewFavorites);
  };

  return (
    <header>
      <h1>Info Movies</h1>
      <form onSubmit={handleSubmit} className="SearchForm">
        <input
          type="text"
          placeholder="Movie ?"
          value={searchTerm}
          required
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
        <button type="submit">Search</button>
        <button type="button" onClick={handleViewFavorites}>
          {viewFavorites ? "All Movies" : "Favorite Movies"}
        </button>

        {movies.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </button>
        ) : (
          ""
        )}
      </form>
    </header>
  );
};


export default Header