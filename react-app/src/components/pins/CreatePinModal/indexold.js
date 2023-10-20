import "./CreatePinModal.css"
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

        let titleInput = document.getElementById('create-pin-title');
        let currentfont = titleInput.style.fontSize
        let indexOfPx = currentfont.indexOf("px")
        let currentfontsize = currentfont.split("").slice(0, indexOfPx).join("")

        if (isOverflown(titleInput)) {
            while (isOverflown(titleInput)) {
                currentfontsize--;
                titleInput.style.fontSize = currentfontsize + 'px';
            }
        } else {
            currentfontsize = 28;
            titleInput.style.fontSize = currentfontsize + 'px';
            while (isOverflown(titleInput)) {
                currentfontsize--;
                titleInput.style.fontSize = currentfontsize + 'px';
            }
        }
    }

    const isOverflown = (element) => {
        return element.scrollWidth > element.clientWidth;
    }


    return (
        <div >
            <div className="create-pin-page-header">
                <div>
                    {viewClearMenu ?
                        <div className="start-over">
                            <button onClick={closeClearMenu}>X</button>
                            <button onClick={clearNewPin} className="clear-pin-button clear" >
                                Clear and Start Over
                            </button>
                        </div>
                        :
                        <div >
                            <i onClick={openClearMenu} className="create-pin-ellipsis fa-solid fa-ellipsis"></i>
                        </div>
                    }
                </div>
                <div className="required-fields">*Field Required</div>
                {/* <div className="and-add-to-board" onChange={(e)=> setBoardChoice(e.target.value)}>
                    <select id="board-selector">
                        <option id="" value="">Add pin to board upon creation</option>
                        {
                            filteredArr.map((board) =>
                                <option
                                    id="board-selector-input"
                                    value={board.id}
                                >{board.name}</option>
                            )
                        }

                    </select>
                </div> */}
            </div>
            <form className="create-pin-page-sub" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className="create-pin-page-left">
                    <div className={fileType === "AWS" ? "photo-uploaded" : "create-pin-aws-option "} >
                        <div className={fileType === "AWS" ? "" : "create-pin-add-border"}>
                            <div className="upload-photo-image">
                                <div className="photo-prompt">Harvest will resize your photo to fit. However, images should be taller than they are wide to display best.</div>
                                <i className="fa-solid fa-circle-arrow-up"></i>
                            </div>
                            {fileType === "AWS" && verifyImage(url) ?
                                <div className="photo-ready">
                                    Success! Photo ready
                                </div>
                                :
                                <label className="file-input">

                                    <input
                                        type="file"
                                        accept="image/jpg, image/png"
                                        onChange={(e) => {

                                            setFileType("AWS")
                                            setUrl(e.target.files[0])

                                        }}
                                    />
                                </label>}

                            <div className="image-prompt"><span className="span-image-prompt">We recommend using high quality .jpg files less than 20mb*</span></div>
                        </div>
                    </div>
                    {/* <div className="create-pin-url-option">
                        <input
                            type="text"
                            placeholder={url ? "" : "Save photo url from site"}
                            value={fileType === "AWS" ? "" : url}
                            onChange={(e) => {
                                setFileType("URL")
                                setUrl(e.target.value)
                            }}

                        />

                    </div> */}
                    <div className="show-photo-errors">
                        {title && link && description && !url && <div className="need-photo-error error">You must include a photo when creating a pin</div>}
                        {fileType !== "AWS" && <div className={url ? "" : isUrl(url) ? "show-error-create no-error" : "show-error-create error"}>{url ? isUrl(url) ? "" : <div className="show-error-create error ">Invalid url entered</div> : ""}</div>}

                    </div>
                </div>
                <div className=" create-pin-page-right">
                    <div className="create-pin-form-field create-pin-add-title" >
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
                    <div className="create-pin-form-field create-pin-user-info">
                        <div className="create-pin-user-spot">{firstLetter}</div>
                        <div className="user-dets">
                            <div>{user.firstName ? user.firstName : user.username}</div>
                            <div>
                                {userPins.length} pins
                            </div>
                        </div>
                    </div>

                    <div className="create-pin-form-field create-pin-add-description">

                        <textarea
                            rows="6"
                            placeholder={description ? "" : "Tell everyone what your pin is about*"}
                            value={description && description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />


                    </div>
                    <div className={description.length > 500 ? "show-error-create-description error" : "show-error-create-description no-error"}>{description.length <= 500 ? 500 - description.length : "Oops! That description is getting a little long. Try trimming it down."}</div>
                    <div className="create-pin-form-field create-pin-add-link">
                        <input
                            type="text"
                            placeholder={link ? "" : "Add a destination link*"}
                            value={link && link}
                            onChange={(e) => setLink(e.target.value)}

                        />

                    </div>

                    <div className={link ? "" : isUrl(link) ? "show-error-create-link no-error" : "show-error-create-link error"}>{link ? isUrl(link) ? "" : <div className="show-error-create-link error ">Invalid url entered</div> : ""}</div>
                    <div>{url.name && !(url.name.includes(".png") || url.name.includes(".jpg")) ? <div>Invalid File Type. Please upload a .png or .jpg type image</div> : <div></div>}</div>
                    {url && (url.name.includes(".png") || url.name.includes(".jpg")) && isUrl(link) && hasPhoto ?
                        <div>
                            <button className="submit-new-pin" type="submit">Create</button>
                        </div> : <div><button disabled className="submit-new-pin-disabled" type="submit">Create</button></div>}
                </div>
            </form>

        </div>
    )
}

export default CreatePinModal
