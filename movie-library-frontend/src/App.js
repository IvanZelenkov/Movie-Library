import axios from "axios";
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './components/Home';
import Trailer from './components/Trailer';
import Reviews from './components/Reviews';
import NotFoundError from './components/NotFoundError';

function App() {
	const [movies, setMovies] = useState();
	const [movie, setMovie] = useState();
	const [reviews, setReviews] = useState([]);

	const getMovies = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/v1/movies");
			setMovies(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	const getMovieData = async (movieId) => {
		try {
			const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
			const movie = response.data;
			setMovie(movie);
			setReviews(movie.reviewIds);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className="App">
			<Header/>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route
						path="/"
						element={<Home movies={movies}/>}
					/>
					<Route
						path="/Trailer/:youTubeTrailerId"
						element={<Trailer/>}
					/>
					<Route
						path="/Reviews/:movieId"
						element ={
							<Reviews
								getMovieData={getMovieData}
								movie={movie}
								reviews={reviews}
								setReviews={setReviews}
							/>}
					/>
					<Route
						path="*"
						element={<NotFoundError/>}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;