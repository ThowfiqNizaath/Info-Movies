import React, { useEffect } from "react";
import { useState } from "react";
import Header from './Header'
import MovieList from "./MovieLIst";
import FavoriteMovies from "./FavoriteMovies";




function App() {
  const [init, setInit] = useState([]);
  const [movies, setMovies] = useState([]);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem("favorite")) || []);
  const [viewFavorites, setViewFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    localStorage.setItem("favorite" , JSON.stringify(favorite))
  } ,[favorite])
  useEffect(() => {
    const demofun = async () => {
      const arr = [
        "Parasite",
        "Joker",
        "1917",
        "Knives Out",
        "Jojo Rabbit",
        "Spider-Man: Into the Spider-Verse",
        "Blade Runner 2049",
        "Moonlight",
        "Lady Bird",
        "Call Me by Your Name",
        "Get Out",
        "Hereditary",
        "The Shape of Water",
        "The Irishman",
        "Inception",
        "The Matrix",
        "Interstellar",
        "The Shawshank Redemption",
        "Pulp Fiction",
        "Fight Club",
        "The Godfather",
        "Forrest Gump",
        "The Dark Knight",
        "Gladiator",
        "The Silence of the Lambs",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Schindler's List",
        "The Departed",
        "Django Unchained",
        "The Avengers",
        "The Usual Suspects",
        "Goodfellas",
        "Avatar",
        "The Social Network",
        "Inglourious Basterds",
        "The Big Lebowski",
        "Memento",
        "The Prestige",
        "La La Land",
        "Whiplash",
        "12 Monkeys",
        "A Clockwork Orange",
        "Se7en",
        "Oldboy",
        "The Grand Budapest Hotel",
        "Her",
        "Drive",
        "Eternal Sunshine of the Spotless Mind",
        "Reservoir Dogs",
      ];
      for (const val of arr) {
        await searchMovies(val);
      }
    };

    demofun();
  }, []); // Empty dependency array ensures this runs only once

const searchMovies = async (term) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${term}&apikey=b39b3808`
    );
    const data = await response.json();

    if (data && data.Title) {
      setViewFavorites(false)
      if (searchTerm.trim()) {
        setMovies(
          () => {
            const exist = favorite.some((curr) => curr.Title === data.Title)
            if(exist){
              const movieFilter = favorite.filter((curr) => (curr.Title === data.Title))
              return movieFilter
            }
            return [data]
          }
        );
      } else {
        setInit(
          (prevInit) => {
            const exist = prevInit.some((movie) => movie.Title === data.Title)
            if(!exist){
               const checkFavorite  = favorite.some((curr) => curr.Title === data.Title)
               return checkFavorite ? (
                [...prevInit , {...data , favorite : true}]
               )  : [...prevInit,{...data , favorite : false } ]
            }
            return prevInit
          }
        )
      }
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}

console.log(movies)
console.log(favorite)

 
  const addFavorite = (movie) => {
    setFavorite(
      (prevFavorite) => {
        const exist = prevFavorite.some((prevmovie) => prevmovie.Title === movie.Title)
        if(!exist){
          return [...favorite ,{...movie , favorite : true}]
        }
        return prevFavorite
      }
    )
    const existed = init.some((initmovie) => 
        initmovie.Title === movie.Title
    )
    if(existed){
      setInit((prevmovie) => {
        const exist = prevmovie.map((val) =>
          val.Title === movie.Title ? { ...val, favorite: true } : val
        );
        return exist;
      });
    }
    else{
       setMovies([{...movie , favorite : true}])
    }
  }

  const removeFavorite = (movie) => {
      setMovies((prevmovie) => (
       prevmovie.map((val) => {
        return val.Title === movie.Title ? {...val , favorite : false} : val
       })
      )) 
      setInit(
        init.map((curr) => (
          curr.Title === movie.Title ? {...curr , favorite : false} : curr
        )
      )
      )
      setFavorite(
        favorite.filter((curr) => (
          curr.Title !== movie.Title
        )
      )
      )
    }
  const handleBack = () => {
      setMovies([])
  }

  const handleDeleteAll = () =>{
    setFavorite([])
    setInit(
      (prevInit) => {
        return prevInit.map((curr) => (
          curr.favorite ? {...curr , favorite : false} : curr
        ))
      }
    )
     setMovies((prevInit) => {
        return prevInit.length > 0 ? prevInit.map((curr) =>
         curr.favorite ? { ...curr, favorite: false } : curr) : []
     });
  }


  return (
    <div className="app">
      <Header
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewFavorites={viewFavorites}
        setViewFavorites={setViewFavorites}
        handleBack = {handleBack}
        movies = {movies}
      />
      {viewFavorites ? (
        <FavoriteMovies
          movies={favorite}
          removeFavoriteMovies={removeFavorite}
          handleDeleteAll = {handleDeleteAll}
        />
      ) : (
        <MovieList
          movies={movies.length > 0 ? movies : init}
          addFavoriteMovies={addFavorite}
          removeFavoriteMovies={removeFavorite}
        />
      )}
    </div>
  );
}

export default App;
