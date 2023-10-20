import "./CreatePin2Modal.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserBoards } from "../../../store/boardsReducer";
import { addPinThunk, getAllPins, addPinAWSThunk, getBoardPins } from "../../../store/pinsReducer";
import AddPinToBoardModal from "../AddPinToBoardModal";
import OpenModalButton from "../../OpenModalButton";
import { addPinToBoardThunk } from "../../../store/pinsReducer";

const CreatePinModal = () => {
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([]);
    const [fileType, setFileType] = useState("")
    const [boardChoice, setBoardChoice] = useState()
    const user = useSelector((state) => state.session.user)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const userBoards = useSelector((state) => state.boardsReducer.boards)
    const allPinArr = Object.values(allPins)
    const userBoardArr = Object.values(userBoards)
    const filteredArr = userBoardArr.filter((board) => board.userId === user.id)
    const userPins = allPinArr.filter((pin) => pin.userId === user.id)
    const dispatch = useDispatch()
    const [imageLoading, setImageLoading] = useState(false)
    const [viewClearMenu, setViewClearMenu] = useState(false)
    const history = useHistory()

    let firstLetter;

    if (user.firstName) firstLetter = user.firstName[0].toUpperCase()
    else firstLetter = user.username[0].toUpperCase()

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (fileType === "AWS") {
            const formData = new FormData();
            formData.append("url", url)
            formData.append("title", title)
            formData.append("link", link)
            formData.append("description", description)

            const newPin = {
                "url": url,
                "title": title,
                "link": link,
                "description": description
            }
            setImageLoading(true);
            await dispatch(addPinAWSThunk(newPin))
            dispatch(getAllPins())
            const newestPin = allPinArr[allPinArr.length - 1]
            let boardId
            if (document.getElementById("board-selector-input")) {
                boardId = document.getElementById("board-selector-input").value
            }
            let data2;
            if (boardId) data2 = await dispatch(addPinToBoardThunk(boardId, newestPin))
            if (boardId) await dispatch(getBoardPins(boardId))
            history.push("/pins/current")

        } else {
            const data = await dispatch(addPinThunk({ url, link, description, title }));
            const newestPin = allPinArr[allPinArr.length - 1]
            const boardId = document.getElementById("board-selector-input").value
            let data2
            if (boardId) data2 = await dispatch(addPinToBoardThunk(boardId, newestPin))
            if (data) {
                setErrors(data);
            } else {
            }
            history.push("/pins/current")
        }
    }

    const verifyImage = (url) => {

    }



    useEffect(async () => {
        await dispatch(getAllPins())
        await dispatch(getUserBoards)

    }, [dispatch])

    const isUrl = (url) => {
        try {
            let validated;
            if (validated = new URL(url) || typeof (url) === "File")
                return true
        }
        catch (e) {
            return false;
        }
        return true;
    }

    const hasPhoto = (e) => {
        if (url) return true
        return false;
    }



    const openClearMenu = () => {
        setViewClearMenu(true)
    }

    const closeClearMenu = (e) => {
        e.preventDefault()
        setViewClearMenu(false)
    }

    const clearNewPin = (e) => {
        e.preventDefault()
        setUrl("")
        setTitle("")
        setDescription("")
        setLink("")
    }

    const changefontsize = () => {

        if (title.length > 0) {
            let titleInput = document.getElementById('create-pin-title');
            let currentfont = titleInput.style.fontSize
            let indexOfVw = currentfont.indexOf("vw")
            let currentfontsize = currentfont.split("").slice(0, indexOfVw).join("")

            if (isOverflown(titleInput)) {
                while (isOverflown(titleInput)) {
                    currentfontsize -= .1;
                    titleInput.style.fontSize = currentfontsize + 'vw';
                }
            } else {
                currentfontsize = 1.8;
                titleInput.style.fontSize = currentfontsize + 'vw';
                while (isOverflown(titleInput)) {
                    currentfontsize -= .1;
                    titleInput.style.fontSize = currentfontsize + 'vw';
                }
            }
        }
    }

    const isOverflown = (element) => {
        return element.scrollWidth > element.clientWidth;
    }


    return (
        <div id="create-pin-outermost-div">
            <form id="create-pin-form" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div id="create-pin-left-column">
                    <div id="create-pin-left-clear-option">
                        {viewClearMenu ?
                            <div id="create-pin-left-clear-submit">
                                <button className="hide-that-button" onClick={closeClearMenu}>
                                    X
                                </button>
                                <button className="hide-that-button" onClick={clearNewPin} >
                                    Clear and Start Over
                                </button>
                            </div>
                            :
                            <div id="create-pin-left-clear-select">
                                <i onClick={openClearMenu} className="fa-solid fa-ellipsis"></i>
                            </div>
                        }
                    </div>
                    <div id="create-pin-left-image-upload">
                        <div id="create-pin-left-border-only">
                            <div id="create-pin-left-side-warning">
                                Harvest will resize your photo to fit. However, images should be taller than they are wide to display best.
                            </div>
                            <div id="create-pin-left-upload-symbol">
                                <i className="fa-solid fa-circle-arrow-up"></i>
                            </div>
                            <div id="create-pin-left-upload-field">
                                {fileType === "AWS" && verifyImage(url) ?
                                    <div >
                                        Success! Photo ready
                                    </div>
                                    :
                                    <label>
                                        <input
                                            type="file"
                                            id="create-pin-left-upload-input"
                                            accept="image/jpg, image/png"
                                            onChange={(e) => {
                                                setFileType("AWS")
                                                setUrl(e.target.files[0])
                                            }}
                                        />
                                    </label>}
                            </div>
                            <div id="create-pin-left-size-reminder">
                                We recommend using high quality .jpg files less than 20mb*
                            </div>
                        </div>
                    </div>
                    <div>
                        {title && link && description && !url && <div className="need-photo-error error">You must include a photo when creating a pin</div>}
                        {fileType !== "AWS" &&
                            <div className={url
                                ?
                                ""
                                : isUrl(url)
                                    ? "show-error-create no-error"
                                    : "show-error-create error"}>
                                {url
                                    ? isUrl(url)
                                        ? ""
                                        :
                                        <div className="show-error-create error ">
                                            Invalid url entered</div>
                                    : ""}
                            </div>}
                    </div>
                </div>
                <div id="create-pin-right-column">
                    <div id="create-pin-right-req-field-row">*Required Field</div>
                    <div id="create-pin-right-title-field-row">
                        <input type="text"
                            value={title && title}
                            placeholder={title ? title : "Add your title*"}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                changefontsize()
                            }}

                            onKeyPress={changefontsize}
                            id="create-pin-title"
                            required
                        />
                        <div className={title.length > 50 ? "show-error-create-pin error" : "show-error-create-pin no-error"}>{title.length <= 50 ? (50 - title.length) : "Oops! This title is getting long. Try trimming it down."}</div>

                    </div>
                    <div id="create-pin-right-user-info-row">
                        <div id="create-pin-user-info-user-spot-left">
                            {firstLetter}
                        </div>
                        <div id="create-pin-user-info-right">
                            <div id="create-pin-user-info-name">
                                {user.firstName ? user.firstName : user.username}
                            </div>
                            <div id="create-pin-user-info-num-pins">
                                {userPins.length} pins
                            </div>
                        </div>
                    </div>
                    <div id="create-pin-right-description-field-row">
                        <textarea
                            rows="6"
                            placeholder={description ? "" : "Tell everyone what your pin is about*"}
                            value={description && description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />
                        <div className={description.length > 500 ? "show-error-create-description error" : "show-error-create-description no-error"}>{description.length <= 500 ? 500 - description.length : "Oops! That description is getting a little long. Try trimming it down."}</div>
                    </div>
                    <div id="create-pin-right-link-field-row">
                        <input
                            type="text"
                            placeholder={link ? "" : "Add a destination link*"}
                            value={link && link}
                            onChange={(e) =>
                                setLink(e.target.value)}

                        />
                    </div>
                    <div id="create-pin-right-form-errors">
                        <div className={link ? "" : isUrl(link) ? "show-error-create-link no-error" : "show-error-create-link error"}>{link ? isUrl(link) ? "" : <div className="show-error-create-link error ">Invalid url entered</div> : ""}</div>
                        <div>{url.name && !(url.name.includes(".png") || url.name.includes(".jpg")) ? <div className="error">Invalid File Type. Please upload a .png or .jpg type image</div> : <div>.</div>}</div>
                    </div>
                    <div id="create-pin-right-form-submit-button-field-row">
                        {url && (url.name.includes(".png") || url.name.includes(".jpg")) && isUrl(link) && hasPhoto ?
                            <button className="create-pin-right-button submit-new-pin" type="submit">Create</button> :

                            <button disabled className="create-pin-right-button submit-new-pin-disabled" type="submit">Create</button>}


                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreatePinModal
