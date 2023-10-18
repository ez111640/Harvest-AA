import "./SignupFormModal.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [errors, setErrors] = useState([]);
	const [passwordError, setPasswordError] = useState("")
	const [repeatEmailError, setRepeatEmailError] = useState("")
	const [repeatUserError, setRepeatUserError] = useState("")
	const [validEmailError, setValidEmailError ] = useState("")
	const { closeModal } = useModal();

	const clearErrors = async (e) => {
		e.preventDefault()
		const validEmail = /^.+@.+$/;
		if (validEmail.test(email) && errors == "Invalid email format") {
			setErrors("")

		} else if (password == confirmPassword && errors == "Confirm Password field must be the same as the Password field") {
			setErrors("")
		} else if(e.target.value.includes("@") && errors[0] === "Email address is already in use.") {
			setErrors("")
		}
	}

	const clearEmailErrors = async(e) => {
		for(let i = 0;i< errors.length;i++){
			if(errors[i][0] === "E") {
				console.log("HERE")
			}
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validEmail = /^.+@.+$/;

		if (!validEmail.test(email)) {
			setValidEmailError("Invalid email address")
			return;
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));

			if (data) {
				for(let i =0;i< data.length;i++){
					let tempData = data[i].split(" ")
					for(let j = 0;j< tempData.length;j++){
						if(tempData[j] == "Email"){
							setRepeatEmailError("Email address already in use")
						} else if (tempData[j] == "Username") {
							setRepeatUserError("Username already in use")
						}
					}
				}
			} else {
				closeModal();
			}

		} else {
			setPasswordError("Confirm Password field must be the same as the Password field")
			setPassword("")
			setConfirmPassword("")
		}



	};

	return (
		<div className='signup-modal-container'>
			<div className="signup-modal-divs symbol-div"><img className="harvest-symbol" src="https://i.ibb.co/vmgZQ9N/HARSymbol.png" alt="HARSymbol" border="0"></img></div>
			<div className="signup-modal-divs signup-modal-div-title">Welcome to Harvest</div>
			<div className="signup-modal-divs font-size-14px">Find new ideas to try</div>
			<div className="signup-modal-divs">

					<ul className="error error-ul">
						{repeatEmailError && <li className="error-li">{repeatEmailError}</li>}
						{repeatUserError && <li className="error-li">{repeatUserError}</li>}
						{passwordError && <li className="error-li">{passwordError}</li>}
						{validEmailError && <li className="error-li">{validEmailError}</li>}
					</ul>

				<form className="signup-form-container" onSubmit={handleSubmit}>
					<div className="signup-form-field">
						<label>
							Email<span className="error">*</span>
						</label>
						<input
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
								repeatEmailError && setRepeatEmailError("")
								validEmailError && setValidEmailError("")
							}}
							required
						/>
					</div><div className="signup-form-field">
						<label>
							Username<span className="error">*</span>
						</label>
						<input
							placeholder="Choose a username"
							type="text"
							value={username}
							onChange={(e) => {setUsername(e.target.value)
								repeatUserError && setRepeatUserError("")
}
							}
							required
						/>
					</div>

					<div className="signup-form-field">
						<label>
							Password<span className="error">*</span>
						</label>
						<input
							placeholder="Create a password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}

							required
						/>
					</div><div className="signup-form-field">
						<label>
							Confirm Password<span className="error">*</span>
						</label>
						<input
							placeholder="Confirm password"
							type="password"
							value={confirmPassword}
							onChange={(e) => {setConfirmPassword(e.target.value)
								passwordError && setPasswordError("")
							}}


							required
						/>
					</div>
					<div className="signup-form-field">
						<label>
							First Name
						</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}

						/>
					</div><div className="signup-form-field">
						<label>
							Last Name
						</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}

						/>
					</div>
					<div className="signup-form-button-field">
						<button type="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignupFormModal;
