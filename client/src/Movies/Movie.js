import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import {useHistory} from 'react-router-dom';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const {push} =useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const routetoUpdateForm = e => {
    e.preventDefault();
    push(`/update-movie/${movie.id}`)
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res);

      push("/");
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div onClick={routetoUpdateForm}>
        Update
      </div>
      <div onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
