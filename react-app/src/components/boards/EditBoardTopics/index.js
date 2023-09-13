import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { addNewBoardTopicThunk, deleteBoardTopicThunk, getAllTopics, getBoardTopicsThunk } from "../../../store/topicsReducer";
import "./EditBoardTopics.css"
import { useHistory, useParams } from "react-router-dom";

function EditBoardTopics(boardId) {
	const topics = useSelector((state) => state.topicsReducer.allTopics)
	const boardTopics = useSelector((state) => state.topicsReducer.boardTopics)
	const history = useHistory();

	// const boardId = useParams()
	const thisBoardId = boardId.boardId

	const topArr = Object.values(topics)

	let topicIds = []

	let boardTopArr = []

	if (boardTopics) boardTopArr = Object.values(boardTopics)
	console.log("BOARDID", boardTopArr)

	if (boardTopArr) {
		boardTopArr.forEach((topic) => {
			topicIds.push(topic.topicId)
		})
	}

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const [page, setPage] = useState(1)
	const { closeModal } = useModal();
	const [newBoard, setNewBoard] = useState("")
	const [chooseGardening, setChooseGardening] = useState("unselected")
	const [chooseWoodworking, setChooseWoodworking] = useState(false)
	const [chooseCookingBaking, setChooseCookingBaking] = useState(false)
	const [chooseSelfCare, setChooseSelfCare] = useState(false)
	const [chooseLivestock, setChooseLivestock] = useState(false)
	const [chooseHouseholdProducts, setChooseHouseholdProducts] = useState(false)
	const [chooseCanningPreserving, setChooseCanningPreserving] = useState(false)
	const [chooseEnergy, setChooseEnergy] = useState(false)

	const [checked, setChecked] = useState("")

	console.log("TOPARR", topArr)

	const handleSubmit = async (e) => {
		e.preventDefault();
		for (let i = 0; i < topArr.length; i++) {
			if (document.getElementById(topArr[i].id).checked) {
				console.log("it's checked")
				dispatch(addNewBoardTopicThunk(topArr[i], thisBoardId))
			}
			if (!document.getElementById(topArr[i].id).checked) {
				dispatch(deleteBoardTopicThunk(topArr[i], thisBoardId))
			}
		}
		closeModal()
		history.push(`/boards/${thisBoardId}`)

	};

	useEffect(() => {
		dispatch(getAllTopics())
		dispatch(getBoardTopicsThunk(thisBoardId))
	}, [dispatch])

	if (!topics) return null
	if (!topicIds) return null
	const topicArr = Object.values(topics)

	const checkBoardTopics = (topicId) => {
		console.log(topicIds)
		console.log("TYPE", typeof (topicId))
		if (topicIds.indexOf(topicId) === -1) return false
		else return true
	}
	return (
		<div>

			<form onSubmit={handleSubmit}>
				{
					topicArr && topicArr.map((topic) => (
						<div>
							{checkBoardTopics(topic.id) ?
								<div>
									<input type="checkbox" value={topic} id={topic.id} checked></input>
									<label>{topic.name}</label>
								</div> :
								<div><input type="checkbox" value={topic} id={topic.id}></input>
									<label>{topic.name}</label></div>}
						</div>
					))
				}
				<button type="submit">Save</button>
			</form>
		</div>
	);
}

export default EditBoardTopics;
