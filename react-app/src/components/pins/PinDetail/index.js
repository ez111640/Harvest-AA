import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PinDetail.css"
import { useEffect, useState } from "react";
import { getAllPins, getOnePin, getOnePinThunk, updatePinThunk } from "../../../store/pinsReducer";
import OpenModalButton from "../../OpenModalButton";
import UpdatePinModal from "../UpdatePinModal";
import DeletePinModal from "../DeletePinModal";
import { getAllComments } from "../../../store/commentsReducer";
import { AddComment } from "../../comments/AddComment";
import DeleteCommentModal from "../../comments/DeleteCommentModal";
import AddPinToBoardModal from "../AddPinToBoardModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { AllComments } from "../../comments/AllComments";

export const PinDetail = () => {
	const allPins = useSelector((state) => state.pinsReducer.pins)
	const user = useSelector((state) => state.session.user)
	const comments = useSelector((state) => state.commentsReducer)
	const thisPin = useSelector((state) => state.pinsReducer.pin)
	const dispatch = useDispatch()
	const { pinId } = useParams()
	const [showEditForm, setShowEditForm] = useState(false)
	const [editUrlValue, setEditUrlValue] = useState(false)
	const [editTitleValue, setEditTitleValue] = useState(false)
	const [editDescValue, setEditDescValue] = useState(false)
	const [editLinkValue, setEditLinkValue] = useState(false)
	const [errors, setErrors] = useState([]);

	let domain;
	const [photoUrl, setPhotoUrl] = useState("")
	const [photoTitle, setPhotoTitle] = useState("")
	const [photoDesc, setPhotoDesc] = useState("")
	const [photoLink, setPhotoLink] = useState("")


	useEffect(() => {
		dispatch(getAllComments())
		dispatch(getOnePinThunk(pinId))
	}, [dispatch])

	const enterEditForm = (e) => {
		setShowEditForm(!showEditForm)
		setEditTitleValue(false)
		setEditUrlValue(false)
		setEditDescValue(false)
		setEditLinkValue(false)
	}



	if (!allPins) return null
	const allPinArray = Object.values(allPins)
	// const thisPin = allPinArray[pinId]
	if (!comments) return null
	const commentArr = Object.values(comments)

	if (!thisPin) return null
	if (!thisPin.link) return null;
	if (thisPin) {
		const url = thisPin?.link
		let splitUrl
		if (url) splitUrl = url.split("/")
		if (splitUrl[0] === "https:") {
			domain = splitUrl[2].split(".")[0]
		}
	}
	const pinComments = commentArr.filter((comment) => comment.pinId == pinId)
	const clickEditUrlButton = (e) => {
		e.preventDefault()
		setEditUrlValue(!editUrlValue)
	}

	const clickEditTitleButton = (e) => {
		e.preventDefault()
		setEditTitleValue(!editTitleValue)

	}

	const clickEditDescButton = (e) => {
		e.preventDefault()
		setEditDescValue(!editDescValue)

	}

	const clickEditLinkButton = (e) => {
		e.preventDefault()
		setEditLinkValue(!editLinkValue)
	}

	let firstLetter
	if (user) {
		if (user.firstName) firstLetter = user.firstName[0].toUpperCase()
		else firstLetter = user.username[0].toUpperCase()
	}


	const goBack = (e) => {
		e.preventDefault();
		window.location = ("/boards")
	}



	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowEditForm(false)
		setEditTitleValue(false)
		setEditUrlValue(false)
		setEditDescValue(false)
		setEditLinkValue(false)
		const updatedPin = {}


		photoUrl ? updatedPin.url = photoUrl : updatedPin.url = thisPin.url
		photoLink ? updatedPin.link = photoLink : updatedPin.link = thisPin.link
		photoTitle ? updatedPin.title = photoTitle : updatedPin.title = thisPin.title
		photoDesc ? updatedPin.description = photoDesc : updatedPin.description = thisPin.description
		updatedPin.id = thisPin.id
		const data = await dispatch(updatePinThunk(updatedPin))
		if (data) {
			setErrors(data);
		} else {
			dispatch(getOnePinThunk(pinId))
		}

		if (!user) return null;
	}

	return (
		<div className="pin-detail-div" >

			<div>{
				<div className="button-container">
					<div onClick={goBack} className="back-arrow"><i className="fa-solid fa-arrow-left-long"></i></div>
					<div></div>
					{user && <div className="pin-detail-buttons">

						{thisPin.userId === user.id && <button type="button" onClick={enterEditForm} className="pin-edit-delete-button"><i className="fa-solid fa-pen-to-square"></i></button>
						}
						{thisPin.userId === user.id &&
							<OpenModalButton
								type="button"
								buttonText={<i className="fa-solid fa-trash"></i>}
								modalComponent={<DeletePinModal pinId={thisPin.id} />}

							/>}
						<OpenModalButton type="button" buttonText={<i className="fa-solid fa-wheat-awn"></i>} modalComponent={<AddPinToBoardModal pin={thisPin} />} />
					</div>

					}
				</div>

			}</div>

			<form id="pin-detail-container" onSubmit={handleSubmit}>
				{editUrlValue ?
					<div id="pin-detail-left">
						<label className='url-field'>
							Edit photo URL:
							<input className="no-placeholder"
								type="text"
								placeholder={thisPin.url}
								onChange={(e) => setPhotoUrl(e.target.value)}
							/>
							<button className="hide-that-button edit-url-close" type="button" onClick={clickEditUrlButton}><i className="fa-solid fa-xmark"></i></button>
						</label>
						<img alt="pin" src={thisPin?.url}></img>
						<div>
							{/* <button type="button" onClick={clickEditUrlButton} value={editUrlValue}><i className="fa-solid fa-check"></i></button> */}
						</div>
					</div>
					:
					<div id="pin-detail-left">
						{
							showEditForm &&
							<button type="button" onClick={clickEditUrlButton} className="photo-edit-button entered-edit-form"><i className="fa-solid fa-pen-to-square"></i></button>
						}
						<img alt="pin" src={thisPin?.url}></img>

					</div>}
				<div id="pin-detail-right">

					{editTitleValue ? <div className="pin-details pin-detail-title">
						<label className='url-field'>
							Edit Title:
						</label>
						<div className="pin-detail-title-sub">
							<textarea className="no-placeholder title-edit-area"
								id="title-input"
								type="text"
								value={photoTitle ? photoTitle : ""}
								placeholder={thisPin.title}
								onChange={(e) => setPhotoTitle(e.target.value)}>
							</textarea>
							<button className="exit-edit-title hide-that-button" type="button" onClick={clickEditTitleButton}><i className="fa-solid fa-xmark"></i></button>
						</div>
						<div>
						</div>
					</div> : <div className="pin-details pin-detail-title-bottom">
						<div className="clear-right">{thisPin.title}</div>
						{
							showEditForm &&
							<button type="button" onClick={clickEditTitleButton} className="regular-edit-button entered-edit-form"><i className="fa-solid fa-pen-to-square"></i></button>
						}
					</div>}
					{editDescValue ?
						<div className=" clear-right pin-details" >
							<div className="editing-description">
								<label className='edit-description-field'>Edit description:
								</label>
								<textarea className="no-placeholder pin-detail-input" id="pin-detail-description"
									type="textarea"
									placeholder={thisPin.description}
									value={photoDesc ? photoDesc : ""}
									onChange={(e) => setPhotoDesc(e.target.value)}>

								</textarea>
							</div>
							<div>
								<button className="hide-that-button exit-edit-desc" type="button" onClick={clickEditDescButton}><i className="fa-solid fa-xmark"></i></button>
							</div>
						</div>
						:
						<div className=" clear-right pin-details pin-detail-description">
							<div>{thisPin.description}</div>
							{
								showEditForm &&
								<button type="button" onClick={clickEditDescButton} className="regular-edit-button entered-edit-form"><i className="fa-solid fa-pen-to-square"></i></button>
							}
						</div>}
					<div className="pin-details">{domain === "www" ? "Visit Site" :
						// <div>{ domain }</div>
						<div>
							<div className="photo-link-edit" >
								<a href={`${thisPin.link}`} ><div className=" goldenrod-on-hover domain-link-from-main">{domain}<i className="fa-solid fa-square-arrow-up-right"></i></div>
								</a>
							</div>
						</div>
					}
					</div>
					{showEditForm &&
						<button className="submit-button save-edits" type="submit">Save Changes</button>
					}
					{!showEditForm && <div>
						<div>
							<div>Comments: </div>
							{pinComments.length ?
								<div>
									{pinComments.map((comment) =>
										<div className="comment-div" id={comment.id}>
											{user && comment.userId === user.id &&
												<OpenModalButton
													buttonText="X"
													modalComponent={<DeleteCommentModal commentId={comment.id} />}
												/>}
											<div className="comment-content">
												<div className="make-bold">{comment.user.firstName ? comment.user.firstName : comment.user.username}</div>
												{comment.commentText}

											</div>
										</div>)}

								</div>
								: <div>Be the first to leave a comment!</div>}
							{user && <div className="sticky-comment">
								<div>{pinComments?.length} comment{pinComments.length > 1 ? "s" : ""}</div>

								<div className="leave-a-comment-area">
									<div className="user-letter">{firstLetter}</div>
									<div><AddComment pinId={thisPin.id} /></div>
								</div>
							</div>}


						</div>
					</div>}
				</div>

			</form>
		</div >
	);
}
