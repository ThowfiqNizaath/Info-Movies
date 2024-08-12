import React from 'react'

const MovieDetails = ({movie}) => {
    const entries = Object.entries(movie)
    // console.log(entries)
    var id = 123044
  return (
    <div className="movie-item details" key={id++}>
      {entries.map(([key, val]) =>
        key === "Poster" ? (
          <div key={id++}>
            <img src={`${val}`} alt="Movie-poster" />
          </div>
        ) : Array.isArray(val) ? (
          <div key={id++}>
            <div>
              <span>{key} :</span>
                {val.map((currVal) =>
                  Object.entries(currVal).map(([key, val]) =>
                    key === "Source" ? (
                      <span key={id++}> {val} -</span>
                    ) : (
                      <span key={id++}> {val} ,</span>
                    )
                  )
                )}
              {/* </div> */}
            </div>
          </div>
        ) : (
          <p key={id++}>
            <span>{key} :</span> {String(val)}
          </p>
        )
      )}
    </div>
  );
}

export default MovieDetails