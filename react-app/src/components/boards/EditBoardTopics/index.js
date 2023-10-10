import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { addNewBoardTopicThunk, deleteBoardTopicThunk, getAllTopics, getBoardTopicsThunk } from "../../../store/topicsReducer";
import "./EditBoardTopics.css"
import { useHistory, useParams } from "react-router-dom";

function EditBoardTopics(boardId) {
	const topics = useSelector((state) => state.topicsReducer.allTopics)
	const boardTopics = useSelector((state) => state.topicsReducer.boardTopics)

	// const history = useHistory();
	const [topic, setTopic] = useState()

	// const boardId = useParams()
	const thisBoardId = boardId.boardId

	// const topArr = Object.values(topics)

	let topicIds = []

	let boardTopArr = []

	if (boardTopics) boardTopArr = Object.values(boardTopics)

	if (boardTopArr) {
		boardTopArr.forEach((topic) => {
			topicIds.push(topic.topicId)
		})
	}

	const dispatch = useDispatch();
	// const [name, setName] = useState("");
	// const [errors, setErrors] = useState([]);
	// const [page, setPage] = useState(1)
	const { closeModal } = useModal();

	// const [checked, setChecked] = useState("")

	let topicId = null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(addNewBoardTopicThunk(topic, thisBoardId))
		dispatch(getBoardTopicsThunk(thisBoardId))
		closeModal()

	};

	useEffect(() => {
		dispatch(getAllTopics())
	}, [dispatch])

	if (!topics) return null
	if (!topicIds) return null
	const topicArr = Object.values(topics)

	const checkBoardTopics = (topicId) => {
		if (topicIds.indexOf(topicId) === -1) return false
		else return true
	}
	return (
		<div>

			<form onSubmit={handleSubmit}>
				<div>Select an Existing Topic: </div>
				{
					topicArr && topicArr.map((topic) => (
						<div>
							{checkBoardTopics(topic.id) ?
								<div>
								</div> :
								<div>
									<input type="radio" value={topic} onClick={() => setTopic(topic)} id={topic.id} name="select-topic" ></input>
									<label>{topic.name}</label>
								</div>}
						</div>

					))
				}
				<div><input type="radio" name="select-topic" onChange={(e) => setTopic(e.target.value)} ></input>Enter a new topic</div>
				<label><textarea></textarea></label>
				<div>
					<button type="submit">Save</button>
				</div>
			</form>
		</div>
	);
}

export default EditBoardTopics;
