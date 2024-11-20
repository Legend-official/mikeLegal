import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMovies } from "@/api/getApi";
import MovieCard from "../movieCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ScaleLoader } from "react-spinners";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const loadMovies = async (reset = false) => {
    try {
      setLoading(true);
      const newMovies = await fetchMovies(
        searchTerm || "Batman",
        reset ? 1 : currentPage
      );
      setMovies(reset ? newMovies : [...movies, ...newMovies]);
      setCurrentPage(reset ? 2 : currentPage + 1);
    } catch (err: any) {
      if (err.message == "Movie not found!") {
        setNotFound(true);
      }
      toast({
        title: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadMovies(true);
  }, [searchTerm.length == 0]);

  useEffect(() => {
    return () => clearTimeout(debounceTimeout);
  }, [debounceTimeout]);

  const handleInputChange = (text: string) => {
    setSearchTerm(text);
    setNotFound(false);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      loadMovies(true);
    }, 1000);
    setDebounceTimeout(timeout);
  };

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        placeholder="Search movies..."
        onChange={(e) => handleInputChange(e.target.value)}
        className="mb-6 mt-3"
      />
      {loading && (
        <div className="relative w-full justify-center center flex">
          <ScaleLoader
            color={"black"}
            loading={loading}
            data-testid="loader"
            aria-label="Loading Spinner"
          />
        </div>
      )}

      <InfiniteScroll
        hasMore={true}
        next={loadMovies}
        dataLength={movies.length}
        loader={
          loading ? (
            <div className="relative w-full justify-center center flex">
              <p>Loading more movies...</p>
            </div>
          ) : null
        }
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notFound ? (
            <div className="relative w-full justify-center center flex">
              <p className="text-xl sm:text-1xl my-6 font-semibold tracking-wide text-center">
                Movie not found
              </p>
            </div>
          ) : (
            <>
              {movies.map((movie: Movies, index) => {
                return (
                  <MovieCard
                    Title={movie.Title}
                    imdbID={movie.imdbID}
                    key={movie?.imdbID + index}
                  />
                );
              })}
            </>
          )}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export interface Movies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default MovieList;
