import React from 'react'

const FavoriteMovies = ({movies, removeFavoriteMovies , handleDeleteAll }) => {
    var id = 1
  return (
    <div className="favoriteMovies">
      <button 
      type = "button"
      onClick={() => handleDeleteAll()}
      className='clearAll'
      >clear All Favorite</button>
      {movies.length !== 0 ? (
        movies.map((movie) => (
          <div key={id++} className="movie-item">
            <img src={`${movie.Poster}`} alt=""></img>
            <div className="movie-detail">
              <h2>{movie.Title}</h2>
              <div className="discription">
                <p>{movie.Genre}</p>
                <p>{movie.imdbRating}</p>
              </div>
              <div className="cast">
                <p>{movie.Actors}</p>
              </div>
              <div className="language">
                <p>{movie.Language}</p>
              </div>
              <div className="year">
                <p>{movie.Released}</p>
              </div>
            </div>
            <div className="button">
              <button
                onClick={() => {
                  removeFavoriteMovies(movie);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="message">
          <h1>Add Favorites</h1>
        </div>
      )}
    </div>
  );
}

export default FavoriteMovies