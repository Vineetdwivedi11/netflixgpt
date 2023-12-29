import React from 'react'
import { IMAGE_CDN } from '../utils/constant'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4' >
        <img alt='movie Card' src={IMAGE_CDN + posterPath}/>
    </div>
  )
}

export default MovieCard