import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPinToBoardThunk } from "../../../store/boardsReducer";
import { addPinThunk, getAllPins } from "../../../store/pinsReducer";
import { addPinAWSThunk } from "../../../store/pinsReducer";
import "./SignupForm.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddPinToBoardModal from "../AddPinToBoardModal";
import { getUserBoards } from "../../../store/boardsReducer";
import OpenModalButton from "../../OpenModalButton";

const CreatePinModal = () => {
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([]);
    const [fileType, setFileType] = useState("")
    const user = useSelector((state) => state.session.user)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const userBoards = useSelector((state) => state.boardsReducer.boards)
    const allPinArr = Object.values(allPins)
    const userBoardArr = Object.values(userBoards)
    const userPins = allPinArr.filter((pin) => pin.userId === user.id)
    const dispatch = useDispatch()
    const [imageLoading, setImageLoading] = useState(false)
    const [viewClearMenu, setViewClearMenu] = useState(false)
    console.log("USERPINS", userPins)
    const history = useHistory()

    let firstLetter;

    if (user.firstName) firstLetter = user.firstName[0].toUpperCase()
    else firstLetter = user.username[0].toUpperCase()

    const handleSubmit = async (e) => {

        console.log("FILETYPE", fileType)
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
            const boardId = document.getElementById("board-selector-input").value
            console.log("BOARDID", boardId)
            if (boardId) await dispatch(addPinToBoardThunk(boardId, newestPin))
            console.log(newestPin)
            history.push("/pins/current")

        } else {
            const data = await dispatch(addPinThunk({ url, link, description, title }));
            const newestPin = allPinArr[allPinArr.length - 1]
            const boardId = document.getElementById("board-selector-input").value
            if (boardId) await dispatch(addPinToBoardThunk(boardId, newestPin))
            if (data) {
                setErrors(data);
                console.log(data)
            } else {
            }
            history.push("/pins/current")
        }
    }



    useEffect(async () => {
        await dispatch(getAllPins())
        await dispatch(getUserBoards)

    }, [dispatch])

    const isUrl = (url) => {
        try {
            let validated = new URL(url)
            return true;
        }
        catch (e) {
            return false;
        }
    }

    const hasPhoto = (e) => {
        if (url || link) return true
        return false;
    }



    const openClearMenu = () => {
        console.log("HERE")
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
        console.log("CPT", titleInput)
        let currentfont = titleInput.style.fontSize
        let indexOfPx = currentfont.indexOf("px")
        console.log("CF", currentfont)
        console.log(indexOfPx)
        let currentfontsize = currentfont.split("").slice(0, indexOfPx).join("")

        console.log("CFS", currentfontsize)
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

    const createNewBoard = (e) => {
        return <OpenModalButton buttonText="" modalComponent={<CreatePinModal />} />
    }

    return (
        <div className="create-pin-page-div">
            <div className="create-pin-page-header">
                <div>
                    {viewClearMenu ?
                        <div>
                            <button onClick={clearNewPin} className="clear" >
                                Clear and Start Over
                            </button>
                            <button onClick={closeClearMenu}>X</button>
                        </div>
                        :
                        <div>
                            <i onClick={openClearMenu} className="create-pin-ellipsis fa-solid fa-ellipsis"></i>
                        </div>
                    }
                </div>
                <div>
                    <select id="board-selector">
                        {
                            userBoardArr.map((board) =>
                                <option id="board-selector-input" value={board.id}>{board.name}</option>
                            )
                        }
                        <option onClick={createNewBoard} id="board-selector-new-board">Create new board</option>
                    </select>
                </div>
            </div>
            <form className="create-pin-page-sub" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className="create-pin-page-left">
                    <div className={fileType === "AWS" ? "photo-uploaded" : "create-pin-aws-option "} >
                        <div className={fileType === "AWS" ? "" : "create-pin-add-border"}>
                            <div className="upload-photo-image"><i className="fa-solid fa-circle-arrow-up"></i></div>
                            {fileType === "AWS" ? <div className="photo-ready">Success! Photo ready</div> : <label className="file-input">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFileType("AWS")
                                        setUrl(e.target.files[0])
                                    }}
                                />
                            </label>}
                            <div className="image-prompt"><span className="span-image-prompt">We recommend using high quality .jpg files less than 20mb</span></div>
                        </div>
                    </div>
                    {title && link && description && !url && <div className="need-photo-error error">You must include a photo when creating a pin</div>}
                    <div className="create-pin-url-option">
                        <input
                            type="text"
                            placeholder={url ? "" : "Save photo url from site"}
                            onChange={(e) => {
                                setFileType("URL")
                                setUrl(e.target.value)
                            }}

                        />

                    </div>
                </div>
                <div className=" create-pin-page-right">
                    <div className="create-pin-form-field create-pin-add-title" >
                        <input type="text"
                            value={title && title}
                            placeholder={title ? title : "Add your title"}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                changefontsize()
                            }}
                            onKeyPress={changefontsize}
                            id="create-pin-title"
                            required
                        />
                        <div className={title.length > 50 ? "show-error-create-pin error" : "show-error-create-pin no-error"}>{title.length <= 50 ? 50 - title.length : "Oops! This title is getting long. Try trimming it down."}</div>
                    </div>
                    <div className="create-pin-form-field create-pin-user-info">
                        <div className="create-pin-user-spot">{firstLetter}</div>
                        <div>
                            <div>{user.firstName ? user.firstName : user.username}</div>
                            <div>
                                {userPins.length} pins
                            </div>
                        </div>
                    </div>

                    <div className="create-pin-form-field create-pin-add-description">

                        <textarea
                            rows="6"
                            placeholder={description ? "" : "Tell everyone what your pin is about"}
                            value={description && description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />


                    </div>
                    <div className={description.length > 500 ? "show-error-create-description error" : "show-error-create-description no-error"}>{description.length <= 500 ? 500 - description.length : "Oops! That description is getting a little long. Try trimming it down."}</div>
                    <div className="create-pin-form-field create-pin-add-link">
                        <input
                            type="text"
                            placeholder={link ? "" : "Add a destination link"}
                            value={link && link}
                            onChange={(e) => setLink(e.target.value)}

                        />

                    </div>
                    <div className={link ? "" : isUrl(link) ? "show-error-create-link no-error" : "show-error-create-link error"}>{link ? isUrl(link) ? "" : <div className="show-error-create-link error ">Invalid url entered</div> : ""}</div>
                    {url && isUrl(link) && hasPhoto ?
                        <div>
                            <button type="submit">Create</button>
                        </div> : <div><button disabled type="submit">Create</button></div>}
                </div>
            </form>

        </div>
    )
}

export default CreatePinModal
