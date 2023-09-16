import OpenModalButton from "../../OpenModalButton"
import CreateBoardModal from "../../boards/UserBoards/CreateBoardModal"

import CreatePinModal from "../../pins/CreatePinModal"
import CreatePinAWSModal from "../../pins/CreatePinAWSModal"
import "./PageHeader.css"
import { useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import SelectImageSourceModal from "../../pins/SelectImageSourceModal"


export const PageHeader = () => {
    const user = useSelector((state) => state.session.user)
    const allBoards = useSelector((state) => state.boardsReducer.boards)
    const allPins = useSelector((state) => state.pinsReducer.pins)

    const allBoardArr = Object.values(allBoards)
    const allPinArr = Object.values(allPins)

    const userBoards = allBoardArr.filter((board) => board.userId === user.id)
    const userPins = allPinArr.filter((pin) => pin.userId === user.id)

    console.log("USERBOARDS", userBoards)
    console.log("USERPINS", userPins)

    const history = useHistory()
    if (!user) history.push("/login")
    let firstLetter;

    if (user.firstName) firstLetter = user.firstName[0]
    else firstLetter = user.username[0]

    const goBack = (e) => {
        e.preventDefault();
        window.location = ("/boards")
    }

let currentPage =  window.location.href.split("/")
let showArrow = true;

if(currentPage[currentPage.length-1] === "boards"){
    showArrow = false;
}

    return (
        <div className="profile-header">
{   showArrow &&
            <div onClick={goBack} className="back-arrow"><i className="fa-solid fa-arrow-left-long"></i></div>
            }
            <div className="profile-div-left">
                <div className="user-spot">
                    <div className="fl-div">{firstLetter}</div>
                </div>
                <div className="profile-div-left-buttons">
                    <div>@{user.username}</div>
                    {<div className="user-stats">
                        {userBoards && <div>{userBoards.length} boards<span className="center-dot">.</span></div>

                        }
                        {userPins && <div>{userPins.length} pins</div>}
                    </div>}
                    {/* <OpenModalButton
                        buttonText="New Pin"
                        modalComponent={<CreatePinModal />}
                    /> */}
                    <div className="page-header-modals">
                        <OpenModalButton
                            buttonText="New Board"
                            modalComponent={<CreateBoardModal />} />
                        <Link to="/pins/new">New Pin</Link>
                        {/* <OpenModalButton
                            buttonText="New Pin!"
                            modalComponent={<SelectImageSourceModal />
                            modalComponent={<CreatePinModal />}

                        /> */}
                    </div>
                    {/* <OpenModalButton
                        buttonText="New AWS Pin"
                        modalComponent={<CreatePinAWSModal />}
                    /> */}
                </div>
            </div>
        </div>
    )
}
