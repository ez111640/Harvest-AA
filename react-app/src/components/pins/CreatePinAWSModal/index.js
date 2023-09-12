import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./SignupForm.css";
import { addPinThunk } from "../../../store/pinsReducer";

function CreatePinAWSModal() {
	const dispatch = useDispatch();
	const [link, setLink] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("")
	const [title, setTitle] = useState("")
	const [errors, setErrors] = useState([]);
	const [imageLoading, setImageLoading] = useState(false)

	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("HANDLINGSUBMIT")
		const formData = new FormData();
		formData.append("url", url)
		formData.append("title", title)
		formData.append("link", link)
		formData.append("description", description)


		const newPin = {
			"url": url,
			"title": title,
			"link": link,
			"description": description
		}
		setImageLoading(true);
		await dispatch(addPinThunk(newPin))
	};

	return (
		<div>
			<form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
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
						type="file"
						accept="image/*"
						onChange={(e) => setUrl(e.target.files[0])}
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

export default CreatePinAWSModal;
