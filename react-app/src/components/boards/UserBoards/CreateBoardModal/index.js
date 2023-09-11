import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal"
import "./SignupForm.css";
import { addBoardThunk, getUserBoards } from "../../../../store/boardsReducer";
import { addNewBoardTopicThunk, getAllTopics } from "../../../../store/topicsReducer";

function CreateBoardModal() {
	const topics = useSelector((state) => state.topicsReducer.topics)
	console.log("TOPICS", topics)

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const [page, setPage] = useState(1)
	const [boardTopic, setBoardTopic] = useState("")
	const { closeModal } = useModal();
	const [newBoard, setNewBoard] = useState("")

	const handleSubmitPageOne = async (e) => {
		e.preventDefault();
		const data = await dispatch(addBoardThunk({ name }));
		setNewBoard(data)
		await dispatch(getUserBoards())

		setPage(2)
		if (data) {
			setErrors(data);
			console.log(errors)
		}
	};
	const handleSubmitPageTwo = async (e) => {
		let topic = document.getElementById("topic-selector")
		e.preventDefault();
		const data = await dispatch(addNewBoardTopicThunk(topic, newBoard));

		if (data) {
			setErrors(data);
			console.log(errors)
		}
	};

	useEffect(() => {
		dispatch(getAllTopics())
	}, [dispatch])

	if (!topics) return null
	const topicArr = Object.values(topics)
	return (
		<div>
			{page === 1 && <form onSubmit={handleSubmitPageOne}>
				<label className='board-name-field'>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Create</button>
			</form>}
			{page === 2 && <form onSubmit={handleSubmitPageTwo}>
				<label className='board-name-field'>
					Topic:
					<select id="topic-selector">{topicArr.map((topic) =>
						<option value={topic}>{topic.name}</option>)}
					</select>
				</label>
				<button type="submit">Create</button>
			</form>}
		</div>
	);
}

export default CreateBoardModal;
