import "./SignupFormModal.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}


	};

	return (
		<div className='signup-modal-container'>
			<div className="signup-modal-divs symbol-div"><img className="harvest-symbol" src="https://i.ibb.co/vmgZQ9N/HARSymbol.png" alt="HARSymbol" border="0"></img></div>
			<div className="signup-modal-divs signup-modal-div-title">Welcome to Harvest</div>
			<div className="signup-modal-divs font-size-14px">Find new ideas to try</div>
			<div className="signup-modal-divs">
					{errors.length > 0 && <ul className="error error-ul">
						{errors.map((error, idx) => (
							<li className="error-li" key={idx}>{error}</li>
						))}
					</ul>}
				<form className="signup-form-container" onSubmit={handleSubmit}>
					<div className="signup-form-field">
						<label>
							Email<span className="error">*</span>
						</label>
						<input
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setUsername(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
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
							onChange={(e) => setConfirmPassword(e.target.value)}
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
