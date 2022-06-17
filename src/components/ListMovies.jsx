import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";

export default function ListMovies() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		getMovies();
	}, []);

	useEffect(() => {
		console.log(movies);
	}, [movies]);

	function getMovies() {
		const movieCollectionRef = collection(db, "movies");
		getDocs(movieCollectionRef)
			.then((response) => {
				const movs = response.docs.map((doc) => ({
					data: doc.data(),
					id: doc.id,
				}));
				setMovies(movs);
			})
			.catch((error) => console.log(error.message));
	}

	return (
		<div>
			<h4>List Movies</h4>
			<button onClick={() => getMovies()}>Refresh movies</button>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.data.name}</li>
				))}
			</ul>
		</div>
	);
}
