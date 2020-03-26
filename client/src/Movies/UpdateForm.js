import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    const {id} = useParams();
    const {push} = useHistory();

    const [movie,setMovie] = useState(initialMovie);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value
        })
    }

    useEffect(() => {
        const movieToUpdate = props.movies.find(e => `${e.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id]);

    const handleSubmit = e => {
        e.preventDefault();

        axios
        .put (`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.setMovieList(res.data);
            push('/movies');
        })
        .catch(err => console.log(err))
    };

    return (
        <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div/>

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div/>

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div/>

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <div/>

        <button>Update</button>
      </form>
    </div>
    )
}

export default UpdateForm;