import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PinDetailModal.css"
import { useEffect, useState } from "react";
import { getAllPins, getOnePin, getOnePinThunk, updatePinThunk } from "../../../store/pinsReducer";
import OpenModalButton from "../../OpenModalButton";
import UpdatePinModal from "../UpdatePinModal";
import DeletePinModal from "../DeletePinModal";
import { getAllComments } from "../../../store/commentsReducer";
import { AddComment } from "../../comments/AddComment";
import DeleteCommentModal from "../../comments/DeleteCommentModal";
import AddPinToBoardModal from "../AddPinToBoardModal";

export const PinDetailModal = ({ pinId }) => {
	const allPins = useSelector((state) => state.pinsReducer.pins)
	const user = useSelector((state) => state.session.user)
	const comments = useSelector((state) => state.commentsReducer)
	const thisPin = useSelector((state) => state.pinsReducer.pin)
	const dispatch = useDispatch()

	let domain;

	useEffect(() => {
		dispatch(getAllComments())
		dispatch(getOnePinThunk(pinId))
	}, [dispatch])


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



	return (
		<div className="pin-detail-modal-main">
			<div className="pin-detail-modal-left">
				<img className="pin-detail-modal-image" src={thisPin.url}></img>
				<div className="link-area">
					<div className="photo-link" >
						<a href={`${thisPin.link}`} ><div className="domain-link">{domain}<i className="fa-solid fa-square-arrow-up-right"></i></div>
						</a>
					</div>
				</div>
			</div>
			<div className="pin-detail-modal-right">
				<div className="pin-detail-modal-grid-right font-bold">{thisPin.title}</div>
				<div className="pin-detail-modal-grid-right font-size-14px">{thisPin.description}</div>
				<div className="pin-detail-modal-grid-right font-size-14px">{domain}</div>
				<div className="pin-detail-modal-grid-right">asfdadf</div>
				<div className="save-pin-from-main">
					<OpenModalButton buttonText="Save" modalComponent={<AddPinToBoardModal pin={thisPin} />} />
				</div>
			</div>

		</div >
	);
}
