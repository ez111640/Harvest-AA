import { useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { useState } from "react"
import { useModal } from "../../../context/Modal"
import { deletePin, getAllPins } from "../../../store/pinsReducer"
import "./deletePinModal.css"
import OpenModalButton from "../../OpenModalButton"
import CreatePinAWSModal from "../CreatePinAWSModal"
import CreatePinModal from "../CreatePinModal"
import { addPinThunk } from "../../../store/pinsReducer"
import { addPinAWSThunk } from "../../../store/pinsReducer"

const SelectImageSourceModal = ({ pinId, lastPage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([]);
    const [page, setPage] = useState(1)
    const [imageLoading, setImageLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllPins())
        history.push("/")
        window.location.reload();
        closeModal()

    }
    const handleSubmitURL = async (e) => {
        e.preventDefault();
        const data = await dispatch(addPinThunk({ url, link, description, title }));
        if (data) {
            setErrors(data);
            console.log(errors)
        } else {
            closeModal();
        }
    };

    const handleSubmitAWS = async (e) => {
        e.preventDefault();
        console.log("HANDLINGSUBMIT")
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
    }


    return (

        <div className="select-image-type">
            {page === 1 &&
                <div>
                    <h1>Create New Pin</h1>
                    <p>What type of image are you using?</p>
                    <button onClick={() => setPage(2)}>Upload Image from Computer</button>
                    <button onClick={() => setPage(3)}>Enter Image URL</button>
                </div>
            }
            {
                page === 2 &&
                <div>
                    <form onSubmit={handleSubmitAWS} method="POST" encType="multipart/form-data">
                        <label className='title-field'>
                            Title
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label className='url-field'>
                            URL
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setUrl(e.target.files[0])}
                                required
                            />
                        </label>

                        <label className='link-field'>
                            Link
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </label>
                        <label className='description'>
                            Description
                            <input
                                type="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Create This Pin</button>
                    </form>
                </div>
            }
            {
                page === 3 &&
                <div>
                    <form onSubmit={handleSubmitURL}>
                        <label className='title-field'>
                            Title
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label className='url-field'>
                            URL
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </label>
                        <label className='link-field'>
                            Link
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </label>
                        <label className='description'>
                            Description
                            <input
                                type="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Create This Pin</button>
                    </form>
                </div>
            }
        </div>
    )
}


export default SelectImageSourceModal;
