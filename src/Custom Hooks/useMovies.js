import { useEffect, useState } from "react";
const Key = "53a7cb8a";
export function useMovies(Queriy) {
  const [NumMoves, setNumMoves] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchData() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${Queriy}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("SomeThing is Wroing With Fetch Moves");

          const date = await res.json();
          if (date.Response === "False") throw new Error("Movie not Found");

          setNumMoves(date.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbrotError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (Queriy.length < 3) {
        setNumMoves([]);
        setError("");
        return;
      }
      //   onCloseMovie();
      FetchData();
      return function () {
        controller.abort();
      };
    },
    [Queriy]
  );
  return { NumMoves, Loading, error };
}
