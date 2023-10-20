import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal"
import "./CreateBoardModal.css";
import { addBoardThunk, getAllBoardsThunk, getUserBoards } from "../../../../store/boardsReducer";
import { addNewBoardTopicThunk, getAllTopics } from "../../../../store/topicsReducer";
import { getBoardTopicsThunk } from "../../../../store/topicsReducer";
import { deleteBoardTopicThunk } from "../../../../store/topicsReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateBoardModal() {
	const topics = useSelector((state) => state.topicsReducer.allTopics)
	const boardTopics = useSelector((state) => state.topicsReducer.boardTopics)
	const boards = useSelector((state) => state.boardsReducer.boards)
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [publicStatus, setPublicStatus] = useState("true")
	const [errors, setErrors] = useState([]);
	const [page, setPage] = useState(1)
	const [boardId, setBoardId] = useState("")
	const { closeModal } = useModal();
	const [newBoard, setNewBoard] = useState("")
	const allTopics = Object.values(topics)
	const boardArr = Object.values(boardTopics)
	const history = useHistory()
	let noMatch = []
	let match = []

	const handleSubmitPageOne = async (e) => {
		e.preventDefault();
		const data = await dispatch(addBoardThunk({ name, publicStatus }));
		setNewBoard(data)
		await dispatch(getUserBoards())
		await dispatch(getAllBoardsThunk())
		setBoardId(data)
		setPage(2)
		if (data) setErrors(data);
	};



	for (let i = 0; i < allTopics.length; i++) {
		for (let j = 0; j < boardArr.length; j++) {
			if (boardArr[j].topicId !== allTopics[i].id) {
				if (!noMatch.includes(allTopics[i].id)) {
					noMatch.push(allTopics[i].id)
				}
			} else {
				if (boardArr[j].boardId === boardId.id) {
					match.push(allTopics[i].id)
				}
			}
		}
	}





	const toggleMatch = (topic) => {
		let index = match.indexOf(topic.id)
		if (index === -1) {
			let newIndex = noMatch.indexOf(topic.id)
			if (noMatch.length) noMatch = noMatch.slice(0, newIndex).concat(noMatch.slice(newIndex + 1))
			match.push(topic.id)
			dispatch(addNewBoardTopicThunk(topic, boardId.id))
			dispatch(getBoardTopicsThunk(boardId.id))
		} else {
			match = match.slice(0, index).concat(match.slice(index + 1))
			noMatch.push(topic.id)
			dispatch(deleteBoardTopicThunk(topic, boardId.id))
			dispatch(getBoardTopicsThunk(boardId.id))
		}
		dispatch(getBoardTopicsThunk(boardId.id))
	}

	const checkTopic = (topicId) => {
		if (match.includes(topicId)) return "match"
		else return "noMatch"
	}

	const handleClick = (e) => {
		e.preventDefault();
		history.push(`/boards`)
		closeModal();
	}

	useEffect(() => {
		dispatch(getAllTopics())
		dispatch(getAllTopics())
		dispatch(getBoardTopicsThunk(boardId.id))
	}, [dispatch])

	if (!topics) return null

	return (
		<div>
			{page === 1 &&
				<form
					className="new-board-form"
					onSubmit={handleSubmitPageOne}>

					<label className='board-name-field'>
						Create Board
					</label>

					<div className="board-name-div">
						<div>Name:</div>
					</div>

					<input className="create-board-input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>

					<div className={name.length > 50
						? "show-error-create-name error"
						: "show-error-create-name no-error"}>
						{name.length <= 50
							? 50 - name.length
							: "Oops! Board names must be 50 characters or less"}
					</div>

					<div className="private-board">
						<input className="create-board-private-input"
							type="checkbox"
							value={!publicStatus}
							onChange={(e) => setPublicStatus(e.target.value)}
						/>
						<div>
							<div className="keep-this make-bold">Keep this board secret</div>
							<div className="only-you">So only you can see it</div>
						</div>
					</div>

					{name.length > 0
						&&
						<button className="create-board-button font-bold"
							type="submit">
							Create
						</button>}

				</form>}
			{page === 2 &&

				<form onSubmit={() => handleClick}>
					<div className="edit-topic-title">Edit Topics</div>
					<div className="topic-div">
						{
							allTopics.map((topic) => (
								<div
									id={topic.id}
									onClick={() => toggleMatch(topic)}
									className={"topic-list " + checkTopic(topic.id)}>
									{topic.name}
								</div>
							))
						}
					</div>
					<button
						className="submit-button-topic"
						type="submit">
						Save
					</button>
				</form>
			}
		</div>
	);
}

export default CreateBoardModal;
