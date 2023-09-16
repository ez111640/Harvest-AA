import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoUser = async (e) => {

    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
    closeModal()
  }

  return (
    <div className="signup-modal-container">
      <div className="signup-modal-divs login-modal-div-title">Log In</div>
      <ul className="error error-ul">
        {errors.map((error, idx) => (
          <li className="error-li" key={idx}>{error}</li>
        ))}
      </ul>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="signup-form-field">
          <label>
            Email
          </label>
          <input
          placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-field">
          <label>
            Password
          </label>
          <input
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
          <div className="signup-form-field">
      <button className="demo-user-button hide-that-button" onClick={handleDemoUser}>Log in as demo user</button>
          </div>
        <div className="signup-form-button-field">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
