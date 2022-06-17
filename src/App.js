import "./App.css";
import Form from "./components/Form";
import React, { useState } from "react";

function App() {
	// here we create an array state to store the form data
	const [formDatas, updateFormDatas] = useState([]);
	const addFormData = (formData) => {
		updateFormDatas([...formDatas, formData]);
	};

	return (
		<div className="App">
			<Form addFormData={addFormData} />
		</div>
	);
}

export default App;
