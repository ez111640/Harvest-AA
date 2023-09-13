import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import "./SignupForm.css";
import { updateBoardThunk, getUserBoards } from "../../../store/boardsReducer";

function UpdateBoardModal({ board }) {
	console.log("BOARD", board.id)
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);


	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newBoard = {}
		name ? newBoard.name = name : newBoard.name = board.name
		newBoard.id = board.id
		const data = await dispatch(updateBoardThunk(newBoard));
		await dispatch(getUserBoards())
		if (data) {
			setErrors(data);
			console.log(errors)
		} else {
			closeModal();
		}
	};

	useEffect(() => {
		dispatch(getUserBoards())
	}, [dispatch])


	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label className='board-name-field'>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
}

export default UpdateBoardModal;
