import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import "./UpdateBoardModal2.css";
import { updateBoardThunk, getUserBoards } from "../../../store/boardsReducer";

function UpdateBoardModal2({ board }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const [publicStatus, setPublicStatus] = useState()

	const url = window.location.href;

	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newBoard = {}
		name ? newBoard.name = name : newBoard.name = board.name
		newBoard.public = board.public
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
				<div className="board-name">
					<div className='edit-board-name-field'>
						Board Name:
					</div>
					<div className="input-new-board-name">
						<input
							type="text"
							value={name && name}
							placeholder={name ? name : board.name}
							className="board-input"
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<div className={name.length > 50 ? "show-error-create-name error" : "show-error-create-name no-error"}>{name.length <= 50 ? 50 - name.length : "Oops! Board names must be 50 characters or less"}</div>
					</div>
					{/* {url.split("/").length !== 4 &&
						<button className="submit-board-name signup-button" type="submit">Save</button>
					} */}
				</div>


					<button className="submit-button change-size" type="submit">Save</button>


			</form>
		</div>
	);
}

export default UpdateBoardModal2;
