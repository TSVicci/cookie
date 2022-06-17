import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/init-firebase";

const Form = () => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState({
		name: "",
		phone: "",
		address: "",
		referral: "",
	});
	//Getting referral code from URL (to submit as field data)
	var url_string = window.location;
	var url = new URL(url_string);
	var referral = String(url).split("/")[3];
	const handleRef = () => {
		var url_string = window.location;
		var url = new URL(url_string);
		setData(url.searchParams.get("ref"));
	};
	//
	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(data);
		setData({ name: "", address: "", phone: "" });
	};
	const handleStep = (step) => {
		setStep(step);
	};

	return (
		<div className="form-wrapper">
			<h4>Form</h4>
			<form>
				{step === 0 && (
					<>
						<h1>Info page {referral}</h1>
						<button
							className="next-button"
							type="submit"
							onClick={() => handleStep(step + 1)}
						>
							till enkäten
						</button>
					</>
				)}
				{step === 1 && (
					<>
						<label htmlFor="name">Ass</label>
						<input
							value={data.name}
							name="name"
							type="text"
							onChange={handleChange}
						/>
						<button
							className="next-button"
							type="submit"
							onClick={() => handleStep(step + 1)}
						>
							next
						</button>
						<button
							className="next-button"
							type="submit"
							onClick={() => handleStep(step - 1)}
						>
							previous
						</button>
					</>
				)}
				{step === 2 && (
					<>
						<label htmlFor="name">wurst</label>
						<input
							value={data.phone}
							name="phone"
							type="text"
							onChange={handleChange}
						/>
						<button
							className="next-button"
							type="submit"
							onClick={() => handleStep(step + 1)}
						>
							next
						</button>
						<button
							className="next-button"
							type="submit"
							onClick={handleSubmit()}
						>
							submit
						</button>
					</>
				)}
			</form>
		</div>
	);
};

export default Form;
