import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addPinThunk, getAllPins } from "../../../store/pinsReducer";
import { addPinAWSThunk } from "../../../store/pinsReducer";
import "./SignupForm.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreatePinModal = () => {
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([]);
    const [fileType, setFileType] = useState("")
    const user = useSelector((state) => state.session.user)
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const allPinArr = Object.values(allPins)
    const userPins = allPinArr.filter((pin) => pin.userId === user.id)
    const dispatch = useDispatch()
    const [imageLoading, setImageLoading] = useState(false)
    console.log("USERPINS", userPins)
    const history = useHistory()

    let firstLetter;

    if (user.firstName) firstLetter = user.firstName[0]
    else firstLetter = user.username[0]

    const handleSubmitURL = async (e) => {
        e.preventDefault();
        const data = await dispatch(addPinThunk({ url, link, description, title }));
        if (data) {
            setErrors(data);
            console.log(errors)
        } else {
            history.push("/boards")
        }
    };

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
            history.push("/pins/current")

        } else {
            const data = await dispatch(addPinThunk({ url, link, description, title }));
            if (data) {
                setErrors(data);
                console.log(data)
            } else {
            }
            history.push("/pins/current")
        }
    }

    // const handleSubmitAWS = async (e) => {
    //     e.preventDefault();
    //     console.log("HANDLINGSUBMIT")
    //     const formData = new FormData();
    //     formData.append("url", url)
    //     formData.append("title", title)
    //     formData.append("link", link)
    //     formData.append("description", description)


    //     const newPin = {
    //         "url": url,
    //         "title": title,
    //         "link": link,
    //         "description": description
    //     }
    //     setImageLoading(true);
    //     await dispatch(addPinAWSThunk(newPin))
    // }

    let isLink = false;
    useEffect(async () => {
        await dispatch(getAllPins())
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


    return (
        <div className="create-pin-page-div">
            <div className="create-pin-page-header">
                Header here
                <div>
                    <button type="submit">Create</button>
                </div>
            </div>
            <form className="create-pin-page-sub" method="POST" encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className="create-pin-page-left">
                    <div className="create-pin-aws-option">
                        <div className="create-pin-add-border">
                            <div className="upload-photo-image"><i className="fa-solid fa-circle-arrow-up"></i></div>
                            <label className="file-input">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFileType("AWS")
                                        setUrl(e.target.files[0])
                                    }}
                                />
                            </label>
                            <div className="image-prompt"><span className="span-image-prompt">We recommend using high quality .jpg files less than 20mb</span></div>
                        </div>
                    </div>
                    <div className="create-pin-url-option">
                        <input
                            type="text"
                            placeholder={url ? "" : "Save from site"}
                            onChange={(e) => {
                                setFileType("URL")
                                setUrl(e.target.value)
                            }}

                        />

                    </div>
                </div>
                <div className=" create-pin-page-right">
                    <div className="create-pin-form-field create-pin-add-title">
                        <input type="text"
                            value={title && title}
                            placeholder={title ? title : "Add your title"}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={title.length > 100 ? "error" : "no-error"}>{title.length <= 100 ? 100 - title.length : "Oops! This title is getting long. Try trimming it down."}</div>
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

                        <input type="text"
                            placeholder={description ? "" : "Tell everyone what your pin is about"}
                            value={description && description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />


                    </div>
                    <div className={description.length > 500 ? "error" : "no-error"}>{description.length <= 500 ? 500 - description.length : "Oops! That description is getting a little long. Try trimming it down."}</div>
                    <div className="create-pin-form-field create-pin-add-link">
                        <input
                            type="text"
                            placeholder={link ? "" : "Add a destination link"}
                            value={link && link}
                            onChange={(e) => setLink(e.target.value)}

                        />

                    </div>
                    <div className={link ? "" : isUrl(link) ? "no-error" : "error"}>{link ? isUrl(link) ? "" : "Invalid url entered" : ""}</div>
                    {url && isUrl(link) ?
                    <div>
                        <button type="submit">Create</button>
                    </div> : <div><button disabled type="submit">Create</button></div>}
                </div>
            </form>

        </div>
    )
}

export default CreatePinModal
