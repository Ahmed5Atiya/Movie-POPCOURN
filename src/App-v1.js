import { useState } from "react";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function App() {
  const [Watched, setMovesWatched] = useState(tempWatchedData);
  const [NumMoves, setNumMoves] = useState(tempMovieData);

  console.log(Watched);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <NavBar NumMoves={NumMoves} />
      <Main>
        <Box>
          <MoveList NumMoves={NumMoves} />
        </Box>
        <Box>
          <Summary Watched={Watched} />
          <ListWatchedMoves Watched={Watched} />
        </Box>
      </Main>
    </>
  );
}

function NavBar({ NumMoves }) {
  return (
    <div className="nav-bar">
      <Logo />
      <Search />
      <p className="num-results">Founded {NumMoves.length} resulit</p>
    </div>
  );
}

function Search() {
  return (
    <input className="search" type="text" placeholder="Search movies..." />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🔥</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main">
        {/* <Box isOpen={isOpen} setIsOpen={setIsOpen} NumMoves={NumMoves} />
        <Box isOpen={isOpen} setIsOpen={setIsOpen} NumMoves={NumMoves} /> */}
        {children}
      </main>
    </>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  function handelOpen() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className="box">
      <button className="btn-toggle" onClick={handelOpen}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MoveList({ NumMoves }) {
  return (
    <ul className="list">
      {NumMoves.map((item) => (
        <li key={item.Title}>
          <img src={item.Poster} alt={`${item.Poster}`} />
          <h3>{item.Title}</h3>
          <div>
            <p>
              <span>🔥</span>
              <span>{item.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
function ListWatchedMoves({ Watched }) {
  return (
    <ul className="list">
      {Watched.map((movie) => (
        <WatchedMove movie={movie} />
      ))}
    </ul>
  );
}
function WatchedMove({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span></span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
function Summary({ Watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(Watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(Watched.map((movie) => movie.userRating));
  const avgRuntime = average(Watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{Watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span></span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
