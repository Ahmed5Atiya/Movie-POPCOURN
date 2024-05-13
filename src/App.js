import { useEffect, useRef, useState } from "react";
// import Stars from "./Stars";
// import StarsRating from "./Stars";
import TheStarsRating from "./TheStarsRating";
import { useLocalStorage } from "./Custom Hooks/useLocalStorage";
import { useMovies } from "./Custom Hooks/useMovies";

const Key = "53a7cb8a";

export default function App() {
  // const [NumMoves, setNumMoves] = useState([]);
  // const [Loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [Queriy, setQueriy] = useState("");
  const [SelectedId, setSelectedId] = useState(null);
  // custom hooks
  // const [NumMoves, Loading, error] = useMovies(Queriy);
  const [Watched, setMovesWatched] = useLocalStorage([], "watched");
  const { NumMoves, Loading, error } = useMovies(Queriy);
  // const [Watched, setMovesWatched] = useState(function () {
  //   const listMovies = localStorage.getItem("watched");
  //   return listMovies ? JSON.parse(listMovies) : [];
  // });
  console.log(Watched);
  function handelSelectedId(id) {
    setSelectedId(id);
  }

  function onCloseMovie() {
    setSelectedId(null);
  }

  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(Watched));
  //   },
  //   [Watched]
  // );

  function handelAddWatchedMovie(movie) {
    setMovesWatched((watched) => [...Watched, movie]);
  }
  function handelDeleteMovieWatched(id) {
    setMovesWatched((Watched) => Watched.filter((item) => item.imdbID !== id));
  }

  // useEffect(
  //   function () {
  //     const controller = new AbortController();
  //     async function FetchData() {
  //       try {
  //         setLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${Key}&s=${Queriy}`,
  //           { signal: controller.signal }
  //         );

  //         if (!res.ok) throw new Error("SomeThing is Wroing With Fetch Moves");

  //         const date = await res.json();
  //         if (date.Response === "False") throw new Error("Movie not Found");

  //         setNumMoves(date.Search);
  //         setError("");
  //       } catch (err) {
  //         if (err.name !== "AbrotError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     if (Queriy.length < 3) {
  //       setNumMoves([]);
  //       setError("");
  //       return;
  //     }
  //     onCloseMovie();
  //     FetchData();
  //     return function () {
  //       controller.abort();
  //     };
  //   },
  //   [Queriy]
  // );

  return (
    <>
      <NavBar NumMoves={NumMoves}>
        <Search Queriy={Queriy} setQueriy={setQueriy} />
      </NavBar>
      <Main>
        <Box>
          {Loading && <Loader />}
          {!Loading && !error && (
            <MoveList NumMoves={NumMoves} handelSelectedId={handelSelectedId} />
          )}
          {error && <ErrorMassage error={error} />}
        </Box>
        <Box>
          {SelectedId ? (
            <MovesDetails
              SelectedId={SelectedId}
              onCloseMovie={onCloseMovie}
              onAddMovie={handelAddWatchedMovie}
              Watched={Watched}
            />
          ) : (
            <>
              <Summary Watched={Watched} />
              <ListWatchedMoves
                Watched={Watched}
                handelDeleteMovieWatched={handelDeleteMovieWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMassage({ error }) {
  return (
    <p className="error">
      <span>❌</span> {error}
    </p>
  );
}
function Loader() {
  return (
    <>
      <p className="loader">Loading....</p>
    </>
  );
}
function NavBar({ NumMoves, children }) {
  return (
    <div className="nav-bar">
      <Logo />
      {children}
      <p className="num-results">Founded {NumMoves.length} resulit</p>
    </div>
  );
}

function Search({ Queriy, setQueriy }) {
  const inputEl = useRef(null);
  console.log(inputEl.current);
  useEffect(
    function () {
      function CallBack(e) {
        if (document.activeElement === inputEl.current) {
          return;
        }
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQueriy("");
        }
      }
      document.addEventListener("keydown", CallBack);
      return () => document.addEventListener("keydown", CallBack);
    },
    [setQueriy]
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={Queriy}
      onChange={(e) => setQueriy(e.target.value)}
      ref={inputEl}
    />
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
function MoveList({ NumMoves, handelSelectedId }) {
  return (
    <ul className="list list-movies">
      {NumMoves.map((item) => (
        <Movie
          item={item}
          key={item.imdbID}
          handelSelectedId={handelSelectedId}
        />
      ))}
    </ul>
  );
}
function Movie({ item, handelSelectedId }) {
  return (
    <li onClick={() => handelSelectedId(item.imdbID)}>
      <img src={item.Poster} alt={`${item.Poster}`} />
      <h3>{item.Title}</h3>
      <div>
        <p>
          <span>🔥</span>
          <span>{item.Year}</span>
        </p>
      </div>
    </li>
  );
}
function ListWatchedMoves({ Watched, handelDeleteMovieWatched }) {
  return (
    <ul className="list">
      {Watched.map((movie) => (
        <WatchedMove
          movie={movie}
          key={movie.imdbID}
          handelDeleteMovieWatched={handelDeleteMovieWatched}
        />
      ))}
    </ul>
  );
}

function MovesDetails({ SelectedId, onCloseMovie, onAddMovie, Watched }) {
  const [movei, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();
  const {
    Title: title,
    Poster: poster,
    Year: year,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movei;
  const isWatched = Watched.map((movie) => movie.imdbID).includes(SelectedId);
  const WatchedUserRating = Watched.find(
    (movie) => movie.imdbID === SelectedId
  )?.userRating;
  function handelAdd() {
    const NewWatchedMovie = {
      imdbID: SelectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddMovie(NewWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function CallBackEvent(e) {
        if (e.code === "Escape") {
          // e.code that if you want to know what the key you click
          onCloseMovie();
          console.log(1);
        }
      }
      document.addEventListener("keydown", CallBackEvent);
      return function () {
        document.removeEventListener("keydown", CallBackEvent);
      };
    },
    [onCloseMovie]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMoveisDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&i=${SelectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMoveisDetails();
    },
    [SelectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>Your Rated with Movie {WatchedUserRating}⭐</p>
              ) : (
                <>
                  <TheStarsRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={25}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handelAdd}>
                      Add To List
                    </button>
                  )}{" "}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedMove({ movie, handelDeleteMovieWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handelDeleteMovieWatched(movie.imdbID)}
        >
          X
        </button>
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
