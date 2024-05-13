import { useEffect, useState } from "react";

export function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(function () {
    const listMovies = localStorage.getItem(key);
    return listMovies ? JSON.parse(listMovies) : [];
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
