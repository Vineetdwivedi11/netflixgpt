import React from 'react'
import Header from './Header';
import useNowPlayingMovies  from "../hooks/NowPlayingMovies";
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {
  useNowPlayingMovies();



  return (
    <div>
       <Header/>
       <MainContainer/>
       <SecondaryContainer/>
      </div>
  )
}

export default Browse