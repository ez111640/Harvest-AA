import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import "./SignupForm.css";
import { updatePinThunk } from "../../../store/pinsReducer";
import { getAllPins } from "../../../store/pinsReducer";

function UpdatePinModal({ pinId }) {
	const dispatch = useDispatch();
	const [link, setLink] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("")
	const [title, setTitle] = useState("")
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	let pin = { link, url, description, title }

	let pins = useSelector((state) => state.pinsReducer.pins)
	let pinArr = Object.values(pins)
	const thisPin = pinArr.filter((pin) => pin.id === pinId)[0]

	let handleSubmit;

	handleSubmit = async (e) => {
		e.preventDefault()
		if (link) pin.link = link
		else pin.link = thisPin.link
		if (url) pin.url = url
		else pin.url = thisPin.url
		if (description) pin.description = description
		else pin.description = thisPin.description
		if (title) pin.title = title
		else pin.title = thisPin.title

		pin.id = thisPin.id

		const data = await dispatch(updatePinThunk(pin))
		if (data) {
			setErrors(data);
		} else {
			closeModal()
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>{thisPin.title}</div><button className="pin-edit-delete-button"><i className="fa-solid fa-pen-to-square"></i></button>

				<label className='title-field'>
					Title
					<input
						type="text"
						value={title}
						placeholder={thisPin === "" ? "" : thisPin.title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				<label className='url-field'>
					URL
					<input
						type="text"
						value={url}
						placeholder={thisPin === "" ? "" : thisPin.url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</label>
				<label className='link-field'>
					Link
					<input
						type="text"
						value={link}
						placeholder={thisPin === "" ? "" : thisPin.title}
						onChange={(e) => setLink(e.target.value)}
						required
					/>
				</label>
				<label className='description'>
					Description
					<input
						type="description"
						value={description}
						placeholder={thisPin === "" ? "" : thisPin.description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Create This Pin</button>
			</form>
		</div>
	);
}

export default UpdatePinModal;
