import { useDispatch, useSelector } from "react-redux"
import { getUserTopicsThunk } from "../../../store/topicsReducer"
import "./UserProfilePage.css"
import { useEffect, useState } from "react"
import { getAllTopics } from "../../../store/topicsReducer"
import { useHistory } from "react-router-dom"
import { addUserFollowThunk, deleteUserFollowThunk } from "../../../store/topicsReducer"
import { updateUserThunk } from "../../../store/session"
import { useModal } from "../../../context/Modal"


function UserProfilePage() {
    const user = useSelector((state) => state.session.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    // const [city, setCity] = useState("")
    // const [state, setState] = useState("")
    const topics = useSelector((state) => state.topicsReducer.allTopics)
    const userTopics = useSelector((state) => state.topicsReducer.userTopics)
    const topArr = Object.values(topics)
    const userTopArr = Object.values(userTopics)
    const dispatch = useDispatch()
    const history = useHistory()
    let noMatch = []
    let match = []

    const { closeModal } = useModal();

    for (let i = 0; i < topArr.length; i++) {
        for (let j = 0; j < userTopArr.length; j++) {
            if (userTopArr[j].topicId !== topArr[i].id) {
                noMatch.push(topArr[i].id)
            } else {
                match.push(topArr[i].id)
            }
        }
    }
    useEffect(() => {
        dispatch(getAllTopics())
        dispatch(getUserTopicsThunk())
    }, [dispatch, userTopArr.length])

    const updateUser = async (e) => {
        e.preventDefault();
        // console.log("HERE")
        // e.preventDefault()
        // let newUser = {}
        // firstName ? newUser.firstName = firstName : newUser.firstName = user.firstName
        // lastName ? newUser.lastName = lastName : newUser.lastName = user.lastName
        // username ? newUser.username = username : newUser.username = user.username
        // email ? newUser.email = email : newUser.email = user.email
        // newUser.id = user.id
        // console.log("newUser", newUser)
        // await dispatch(updateUserThunk(newUser))
        // closeModal()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        closeModal()
    }

    const toggleMatch = async (topic) => {
        let index = match.indexOf(topic.id)
        if (index === -1) {
            let newIndex = noMatch.indexOf(topic.id)
            noMatch = noMatch.slice(0, newIndex).concat(noMatch.slice(newIndex + 1))
            match.push(topic.id)
            await dispatch(addUserFollowThunk(topic.id))
            await dispatch(getUserTopicsThunk())
        } else {
            match = match.slice(0, index).concat(match.slice(index + 1))
            noMatch.push(topic.id)
            let follow;
            for (let i = 0; i < userTopArr.length; i++) {
                if (userTopArr[i].topicId == topic.id) {
                    follow = userTopArr[i]
                }
            }
            await dispatch(deleteUserFollowThunk(topic, follow))
            await dispatch(getUserTopicsThunk())
        }
    }

    const checkTopic = (topicId) => {
        if (match.includes(topicId)) return "match"
        else return "noMatch"
    }



    if (!user) history.push("/")
    if (!topArr.length) return null
    return (
        <div className="edit-profile-div">
            <div>
                <div className="edit-interests">
                    {/* <div className="edit-profile-header">Edit Your Interests</div> */}
                    <div className="edit-interest-subtitle">Select the topics you want to follow for personalized recommendations</div>
                    <div className="edit-interest">
                        {
                            topArr.map((topic) => (
                                <div id={topic.id} onClick={() => toggleMatch(topic)} className={"ind-topic topic-list-item " + checkTopic(topic.id)}>{topic.name}</div>
                            ))
                        }
                    </div>
                    <button onClick={onSubmit} className="user-topic-button submit-button" type="submit">Submit</button>
                </div>
            </div>
            {/* <form className="edit-interests" onSubmit={updateUser}> */}
            {/* <div className="edit-interest-subtitle">Edit Profile Info</div> */}

            {/* <div className="edit-category">
                    <label>
                        First Name:
                        <input
                            type="text"
                            placeholder={firstName ? "" : user.firstName}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            placeholder={lastName ? "" : user.lastName}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                    </label>
                </div> */}

            {/* <div  className="edit-category">
                    <div className="edit-interest-subtitle">Edit Login Credentials</div>
                    <label>
                        Username:
                        <input
                            type="text"
                            placeholder={username ? "" : user.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            placeholder={email ? "" : user.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </label>
                </div> */}
            {/* <div className="edit-category">
                    <div className="edit-interest-subtitle">Change Password</div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </label>
                </div> */}

            {/* </form> */}
        </div>
    )
}

export default UserProfilePage;
