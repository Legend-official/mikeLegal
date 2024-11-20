import { APIClient } from "./axios";
import { MOVIES, MOVIES_DETAILS, API_KEY } from "./endpoint";

// fetch movies by search string and api is paginated
export const fetchMovies = async (searchTerm: string, page: number) => {
  const response = await APIClient().get(MOVIES, {
    params: {
      page: page,
      s: searchTerm,
      apikey: API_KEY,
    },
  });

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data.Search;
};

// fetch movies detail based on the movie ID
export const fetchMoviesDetail = async (imdbID: string) => {
  const response = await APIClient().get(MOVIES_DETAILS, {
    params: {
      i: imdbID,
      apikey: API_KEY,
    },
  });

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};
