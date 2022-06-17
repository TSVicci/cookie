import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/init-firebase";

const AddMovie = () => {
	const [name, setName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (name === "") {
			return;
		}
		const moviesCollRef = collection(db, "movies");
		addDoc(moviesCollRef, { name })
			.then((response) => {
				console.log(response.id);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	return (
		<div>
			<h4>AddMovie</h4>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Movie Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;
