import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./SignupForm.css";
import { addPinThunk } from "../../../store/pinsReducer";

function CreatePinModal2() {
	const dispatch = useDispatch();
	const [link, setLink] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("")
	const [title, setTitle] = useState("")
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(addPinThunk({ url, link, description, title }));
		if (data) {
			setErrors(data);
			console.log(errors)
		} else {
			closeModal();
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label className='title-field'>
					Title
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				<label className='url-field'>
					URL
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</label>
				<label className='link-field'>
					Link
					<input
						type="text"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						required
					/>
				</label>
				<label className='description'>
					Description
					<input
						type="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Create This Pin</button>
			</form>
		</div>
	);
}

// export default CreatePinModal2;
