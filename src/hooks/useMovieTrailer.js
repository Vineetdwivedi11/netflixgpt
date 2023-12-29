import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) =>{
    const dispatch = useDispatch();
  // const [trailerId,setTrailerId] = useState(null);

  const getMovieVideos = async () =>{
    const data = await fetch("https://api.themoviedb.org/3/movie/" +
    movieId+ 
    "/videos?language=en-US",API_OPTIONS);
    const json = await data.json();
    // Filtering trailer from whole Movie API...
    const filterData = json.results.filter(video => video.type === 'Trailer');
    const trailer = filterData.length?filterData[0]:json.results[0];
    // console.log('trailer',trailer);
    // setTrailerId(trailer.key)
    dispatch(addTrailerVideo(trailer))
  };

  useEffect(()=>{
    getMovieVideos();
  },[]);

}


export default useMovieTrailer;