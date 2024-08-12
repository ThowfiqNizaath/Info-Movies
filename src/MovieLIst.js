import React from 'react'
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import MovieDetails from './MovieDetails';

const MovieList = ({movies , addFavoriteMovies , removeFavoriteMovies }) =>{
   var id = 1

   const handleFavorite = (movie) => {
         if(movie.favorite){
             removeFavoriteMovies(movie);
         }
         else{
           addFavoriteMovies(movie);
         }
   }
   return (
     <div className="movie-list details">
       {movies.map((movie) =>
         (
           <div
             key={id++}
             className="movie-item"
             onClick={() => {
               handleFavorite(movie);
             }}
           >
             <img src={`${movie.Poster}`} alt=""></img>
             <div className="movie-detail">
               <h2>{movie.Title}</h2>
               <div className="discription">
                 <p>
                   {" "}
                   <span>Genre : </span>
                   {movie.Genre}
                 </p>
                 <p>
                   {" "}
                   <span>Ratings : </span>
                   {movie.imdbRating}
                 </p>
               </div>
               <div className="cast">
                 <p>
                   {" "}
                   <span>Cast : </span>
                   {movie.Actors}
                 </p>
               </div>
               <div className="language">
                 <p>
                   {" "}
                   <span>Language : </span>
                   {movie.Language}
                 </p>
               </div>
               <div className="year">
                 <p>
                   {" "}
                   <span>Released : </span>
                   {movie.Released}
                 </p>
               </div>
             </div>
             <div className="button">
               <button
                 onClick={() => {
                   handleFavorite(movie);
                 }}
                 type="button"
               >
                 {movie.favorite ? (
                   <MdOutlineFavorite style={{ color: "red" }} />
                 ) : (
                   <MdFavoriteBorder />
                 )}
               </button>
             </div>
           </div>
         )
       )}c
     </div>
   );
}
export default MovieList