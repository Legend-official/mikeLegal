import { useState } from "react";
import { Star, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchMoviesDetail } from "@/api/getApi";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useToast } from "@/hooks/use-toast";

const MovieCard = ({ Title, imdbID }: { Title: string; imdbID: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onExpandClick = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);
    try {
      setLoading(true);
      const movieDetail = await fetchMoviesDetail(imdbID);
      setMovie(movieDetail);
    } catch (err: any) {
      toast({
        title: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <li
      onClick={onExpandClick}
      className="hover:cursor-pointer border-b-2 py-10"
    >
      <div className="flex items-center justify-between px-10">
        <h3 className="text-xl sm:text-1xl font-semibold tracking-wide text-start ">
          {Title}
        </h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      {expanded && (
        <Card className="w-full max-w-md mx-auto overflow-hidden mt-4">
          {loading ? (
            <div className="relative h-50 w-full justify-center center flex my-20">
              <ScaleLoader
                color={"black"}
                loading={loading}
                data-testid="loader"
                aria-label="Loading Spinner"
              />
            </div>
          ) : (
            <>
              <div className="relative w-full">
                <img
                  src={movie?.Poster}
                  alt="You Are So Not Invited to My Bat Mitzvah"
                  className="object-cover w-full h-80 mb-3"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {movie?.Year}
                  </Badge>
                </div>
              </div>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{movie?.Runtime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie?.Genre?.split(",")?.length &&
                      movie?.Genre?.split(",").map((genre, index) => (
                        <Badge key={genre + index} variant="outline">
                          {genre}
                        </Badge>
                      ))}
                  </div>
                  <p className="text-sm">{movie?.Plot}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">
                      Director: {movie?.Director}
                    </p>
                    <p className="text-sm font-semibold">
                      Writers: {movie?.Writer}
                    </p>
                    <p className="text-sm font-semibold">
                      Actors: {movie?.Actors}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">
                        {movie?.imdbRating}/10 IMDb
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Released: {movie?.Released}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {movie?.Awards}
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </li>
  );
};

export default MovieCard;

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
