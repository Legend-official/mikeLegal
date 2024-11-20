import { APIClient } from "./axios";

// fetch movies by search string and api is paginated 
export const fetchMovies = async (searchTerm: string, page: number) => {
  const response = await APIClient().get("", {
    params: {
      s: searchTerm,
      page: page,
    },
  });

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data.Search;
};

// fetch movies detail based on the movie ID
export const fetchMoviesDetail = async (imdbID: string) => {
  const response = await APIClient().get("", {
    params: {
      i: imdbID,
    },
  });

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};
