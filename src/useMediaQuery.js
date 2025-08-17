import { useState, useEffect } from "react";

/**
 * Custom hook to check if a media query matches
 * @param {string} query - The media query to match
 * @returns {boolean} - True if the query matches, false otherwise
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
