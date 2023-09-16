import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PinDetailModal.css"
import { useEffect, useState } from "react";
import { getAllPins, getOnePin, getOnePinThunk, updatePinThunk } from "../../../store/pinsReducer";
import OpenModalButton from "../../OpenModalButton";
import UpdatePinModal from "../UpdatePinModal";
import DeletePinModal from "../DeletePinModal";
import { deleteCommentThunk, getAllComments } from "../../../store/commentsReducer";
import DeleteCommentModal from "../../comments/DeleteCommentModal";
import AddPinToBoardModal from "../AddPinToBoardModal";
import { addCommentThunk } from "../../../store/commentsReducer";
import ProfileButton from "../../Navigation/ProfileButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const PinDetailModal = ({ pinId }) => {
	const allPins = useSelector((state) => state.pinsReducer.pins)
	const user = useSelector((state) => state.session.user)
	const comments = useSelector((state) => state.commentsReducer)
	const thisPin = useSelector((state) => state.pinsReducer.pin)
	const dispatch = useDispatch()
	const [commentText, setCommentText] = useState("")
	const [deleteOption, setDeleteOption] = useState(false)
	const history = useHistory()
	const [commentId, setCommentId] = useState("")

	let domain;

	useEffect(() => {
		dispatch(getAllComments())
		dispatch(getOnePinThunk(pinId))
	}, [dispatch])


	let firstLetter
	if (user) {
		if (user.firstName) firstLetter = user.firstName[0]
		else firstLetter = user.username[0]
	}

	const handleSubmit = (e) => {

		e.preventDefault()
		console.log(pinId, pinId)
		let comment = { commentText, pinId }
		dispatch(addCommentThunk(comment))

	}



	if (!allPins) return null
	const allPinArray = Object.values(allPins)
	// const thisPin = allPinArray[pinId]
	if (!comments) return null
	const commentArr = Object.values(comments)
	const userComments = commentArr.filter((comment) => comment.pinId === thisPin.id)

	if (!thisPin) return null
	if (!thisPin.link) return null;
	if (thisPin) {
		const url = thisPin?.link
		let splitUrl
		if (url) splitUrl = url.split("/")
		if (splitUrl[0] === "https:") {
			domain = splitUrl[2].split(".")[0]
			if (domain === "www")
				domain = splitUrl[2].split(".")[1]
		}
	}
	let openDelete = false;

	const openDeleteMenu = (e) => {
		console.log(e)
		e.preventDefault();
		openDelete = true;
	}

	const onSubmit = (e) => {
		console.log("COMMENTID", commentId)
		e.preventDefault();
		dispatch(deleteCommentThunk(commentId))
		setDeleteOption(false)
		// history.push()
	}


	return (
		<div className="pin-detail-modal-main">

			<div className="pin-detail-modal-left">
				<img className="pin-detail-modal-image" src={thisPin.url}></img>
				<div className="link-area">
					<div className="photo-link" >
						<div onClick={() => { window.open(thisPin.link) }} className="domain-link">
							{domain}
							<i className="fa-solid fa-square-arrow-up-right">
							</i></div>

					</div>
				</div>
			</div>
			<div className="pin-detail-modal-right">
				<div className="pin-detail-modal-grid-right font-bold">{thisPin.title}</div>
				<div className="pin-detail-modal-grid-right pin-dm-desc">{thisPin.description}</div>
				<div className="pin-detail-modal-grid-right pin-dm-link font-size-14px">
					<div className="save-pin-from-main">{domain}</div>
					<div className="save-pin-from-main">
						<OpenModalButton buttonText="Save" modalComponent={<AddPinToBoardModal pin={thisPin} />} />
					</div>

				</div>
				<div className="pin-detail-modal-grid-right comments">
					<div className="pin-comment-header">Comments: </div>
					{userComments.length ?
						<div className="comment-div-container" id="comment-list">
							{userComments.map((comment) =>

								<div className="comment-div" id={comment.id}>
									{user && comment.userId === user.id &&
										<div>
											{!deleteOption && <button type="button"
												onClick={() => {
													setDeleteOption(!deleteOption)
													setCommentId(comment.id)
												}
												}>X</button>}
											{ /*<OpenModalButton
											buttonText="X"

											modalComponent={<DeleteCommentModal commentId={comment.id} />}
										/> */}

											{deleteOption === true && <div className="delete-comment">
												<div>Are you sure you want to remove this comment?</div>
												<button onClick={
													onSubmit}>Yes (Delete)</button>
												<button onClick={()=>setDeleteOption(false)}>No (Keep)</button>
											</div>}
										</div>
										// <div>
										// 	<DeleteCommentModal className="fix-z" commentId={comment.id} />
										// </div>
									}
									<div className="pin-detail-comment-content">
										<div className="make-bold">{comment.user.firstName ? comment.user.firstName : comment.user.username}</div>
										{comment.commentText}

									</div>
								</div>)}

						</div>
						: <div className="pin-detail-comment-content">Be the first to leave a comment!</div>}

					< hr />
				</div>

				{user && <div className="leave-a-comment-area">
					<div className="user-letter">{firstLetter}</div>
					<label className='comment-text-fields'>
						<div className="enter-comment-input">
							<input
								type="text"
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								required
							/>
							<button onClick={handleSubmit} type="Submit"><i className="fa-solid fa-check"></i></button>
						</div>
					</label>
				</div>}




			</div>

		</div >
	);
}
