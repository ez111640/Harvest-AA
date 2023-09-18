import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import "./UpdateBoardModal.css";
import { updateBoardThunk, getUserBoards } from "../../../store/boardsReducer";

function UpdateBoardModal({ board }) {
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
		} else {
			closeModal();
		}
	};

	useEffect(() => {
		dispatch(getUserBoards())
	}, [dispatch])


	return (
		<div className="edit-board-modal">
			<form onSubmit={handleSubmit}>
				<label className='edit-board-name-field'>
					Board Name:
				</label>
				<input
					type="text"
					value={name ? name : board.name}
					
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<button className="signup-button" type="submit">Save Changes</button>
			</form>
		</div>
	);
}

export default UpdateBoardModal;
