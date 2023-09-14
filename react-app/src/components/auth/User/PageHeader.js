import OpenModalButton from "../../OpenModalButton"
import CreateBoardModal from "../../boards/UserBoards/CreateBoardModal"
import CreatePinModal from "../../pins/CreatePinModal"
import CreatePinAWSModal from "../../pins/CreatePinAWSModal"
import "./UserBoards.css"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import SelectImageSourceModal from "../../pins/SelectImageSourceModal"

export const PageHeader = () => {
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
    if (!user) history.push("/login")
    let firstLetter;

    if(user.firstName) firstLetter = user.firstName[0]
    else firstLetter = user.username[0]

    return (
        <div className="profile-header">
            <div className="profile-div-left">
                <div>,_</div>
                <div className="user-spot">
                    <div className="fl-div">{firstLetter}</div>
                </div>
                <div className="profile-div-left-buttons">
                    <div>@{user.username}</div>
                    {/* <OpenModalButton
                        buttonText="New Pin"
                        modalComponent={<CreatePinModal />}
                    /> */}
                        <OpenModalButton
                            buttonText="New Board"
                            modalComponent={<CreateBoardModal />} />
                    <OpenModalButton
                        buttonText="New Pin!"
                        modalComponent={<SelectImageSourceModal />}
                    />
                    {/* <OpenModalButton
                        buttonText="New AWS Pin"
                        modalComponent={<CreatePinAWSModal />}
                    /> */}
                </div>
            </div>
        </div>
    )
}
