import OpenModalButton from "../../OpenModalButton"
import CreateBoardModal from "../../boards/UserBoards/CreateBoardModal"
import CreatePinModal from "../../pins/CreatePinModal"
import "./UserBoards.css"
import { useSelector } from "react-redux"

export const PageHeader = () => {
    const user = useSelector((state) => state.session.user)
    const firstLetter = user.username[0]


    return (
        <div className="profile-header">
            <div className="profile-div-left">
                <div className="user-spot">
                    <div className="fl-div">{firstLetter}</div>
                </div>
                <div className="profile-div-left-buttons">
                    <OpenModalButton
                        buttonText="New Pin"
                        modalComponent={<CreatePinModal />}
                    />
                    <OpenModalButton
                        buttonText="New Board"
                        modalComponent={<CreateBoardModal />} />
                </div>
            </div>
        </div>
    )
}
