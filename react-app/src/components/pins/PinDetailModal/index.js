import "./PinDetailModal.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOnePinThunk } from "../../../store/pinsReducer";
import { deleteCommentThunk, getAllComments } from "../../../store/commentsReducer";
import { addCommentThunk } from "../../../store/commentsReducer";
import OpenModalButton from "../../OpenModalButton";
import AddPinToBoardModal from "../AddPinToBoardModal";
import SignupFormModal from "../../SignupFormModal";

export const PinDetailModal = ({ pinId }) => {
	const allPins = useSelector((state) => state.pinsReducer.pins)
	const user = useSelector((state) => state.session.user)
	const comments = useSelector((state) => state.commentsReducer)
	const thisPin = useSelector((state) => state.pinsReducer.pin)
	const dispatch = useDispatch()
	const [commentText, setCommentText] = useState("")
	const [deleteOption, setDeleteOption] = useState(false)
	const [commentId, setCommentId] = useState("")
	const [openAddPin, setOpenAddPin] = useState("")

	let domain;

	useEffect(() => {
		dispatch(getAllComments())
		dispatch(getOnePinThunk(pinId))
	}, [dispatch])


	let firstLetter
	if (user) {
		if (user.firstName) firstLetter = user.firstName[0].toUpperCase()
		else firstLetter = user.username[0].toUpperCase()
	}

	const handleSubmit = async (e) => {

		e.preventDefault()
		let comment = { commentText, pinId }
		await dispatch(addCommentThunk(comment))

	}



	if (!allPins) return null
	const allPinArray = Object.values(allPins)
	// const thisPin = allPinArray[pinId]
	if (!comments) return null
	const commentArr = Object.values(comments)
	const pinComments = commentArr.filter((comment) => comment.pinId === thisPin.id)

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
		e.preventDefault();
		openDelete = true;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(deleteCommentThunk(commentId))
		await dispatch(getAllComments())
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
							<i className="fa-solid fa-square-arrow-up-right"></i>
						</div>
					</div>
				</div>
			</div>
			<div className="pin-detail-modal-right">
				<div className="pin-detail-modal-grid-right font-bold">
					{thisPin.title}
				</div>
				<div className="pin-detail-modal-grid-right pin-dm-desc">
					{thisPin.description}
				</div>
				<div className="pin-detail-modal-grid-right pin-link">
					{domain}
				</div>
				<div className="pin-detail-modal-grid-right pin-dm-link ">
					<div className="save-pin-from-main">
						{user ?
							openAddPin ?
								<AddPinToBoardModal pin={thisPin} />
								:
								<AddPinToBoardModal pin={thisPin} />
							:
							<div className="prompt-signup"><OpenModalButton buttonText="Signup To Pin" modalComponent={<SignupFormModal />} /></div>
						}
					</div>
				</div>
				<div className="pin-detail-modal-grid-right comments">
					<div className="pin-comment-header">
						Comments:
					</div>
					{pinComments.length ?
						<div
							className="comment-div-container"
							id="comment-list">
							{pinComments.map((comment) =>

								<div className="comment-div" id={comment.id}>
									<div className="pin-detail-comment-content">
										<div className="make-bold">{comment.user.firstName ? comment.user.firstName : comment.user.username}</div>
										<div className="margin-left-10px">{comment.commentText}</div>

										{user && comment.userId === user.id &&
											<div>
												{!deleteOption &&
													<button className="hide-that-button delete-comment-button" type="button"
														onClick={() => {
															setDeleteOption(!deleteOption)
															setCommentId(comment.id)
														}}>
														X
													</button>}
												{deleteOption === true
													&& <div className="delete-comment">
														<div>Remove this comment?</div>
														<button
															className="hide-that-button"
															onClick={() => setDeleteOption(false)}>
															<i className="fa-solid fa-x">
																No (keep comment)
															</i>
														</button>
														<button
															className="hide-that-button"
															onClick={
																onSubmit}><i className="confirm-delete-check fa-solid fa-check"> Yes (delete comment)</i></button>
													</div>}
											</div>
										}
									</div>
								</div>)}
						</div>
						:
						<div className="pin-detail-comment-options">
							{user
								? "Be the first to leave a comment!"
								: "Sign in to share your thoughts!"}
						</div>
					}
				</div>
				{user &&
					pinComments.find((comment) => comment.userId === user.id) ?
					<div className="thanks">Thank you for your comment!</div> :
					<div className="leave-a-comment-area">
						{user
							&& <div className="user-letter">
								{firstLetter}
							</div>}
						{user
							&& <label className='comment-text-fields'>
								<div className="enter-comment-input">
									<input
										type="text"
										value={commentText}
										onChange={(e) => setCommentText(e.target.value)}
										required
										placeholder="Leave a comment"
									/>
									{commentText
										&& commentText.length <= 100
										&& <button
											onClick={handleSubmit}
											type="Submit">
											<i className="fa-solid fa-check"></i>
										</button>}
								</div>
								<span className="float-right">
									{commentText
										? commentText.length <= 100
											? 100 - commentText.length
											: <span className="error">
												Your comment must be 100 characters or less
											</span>
										: 100}
								</span>
							</label>}
					</div>

				}




			</div>

		</div >
	);
}
