import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBoards } from "../../../store/boardsReducer"
import { BoardCard } from "./BoardCard/BoardCard";
import { getAllPins } from "../../../store/pinsReducer";
import { Link } from 'react-router-dom'
import CreatePinModal from "../../pins/CreatePinModal"
import "./UserBoards.css"
import OpenModalButton from "../../OpenModalButton";
import { PinCard } from "../../pins/PinCard/PinCard";
import CreateBoardModal from "./CreateBoardModal";
import { PageHeader } from "../../auth/User/PageHeader";



export const UserBoards = () => {
    const user = useSelector((state) => state.session.user)
    const pins = useSelector((state) => state.pinsReducer.pins)



    const userBoards = useSelector((state) => state.boardsReducer.boards)
    console.log("USERBOARDS", userBoards)
    const dispatch = useDispatch();
    const firstLetter = user.username[0]
    const [viewType, setViewType] = useState('boards')
    const [pinsActive, setPinsActive] = useState('inactive-option')
    const [boardsActive, setBoardsActive] = useState('inactive-option')

    // const { closeModal } = useModal()

    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/';
        }, 0);
        window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
    }



    const showPins = (e) => {
        e.preventDefault();
        setViewType("pins")
        setPinsActive("active-option")
        setBoardsActive("inactive-option")
    }
    const showBoards = (e) => {
        e.preventDefault();
        setViewType("boards")
        setBoardsActive("active-option")
        setPinsActive("inactive-option")
    }

    let userBoardArray;
    if (userBoards) userBoardArray = Object.values(userBoards)
    const pinArray = Object.values(pins)
    let userPins = pinArray.filter((pin) => pin.userId === user.id)
    console.log(userBoardArray)

    if (!pins) return null
    return (
        <div>
            {/* <div className="profile-header">
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
            </div> */}
            <PageHeader />
            <div className="view-type-button-div">
                <div>View</div>
                <div className="view-type-buttons">
                    <button type="button" className={"board-button " + boardsActive} onClick={showBoards}>Boards</button>
                    <button type="button" className={"pins-button " + pinsActive} onClick={showPins}>Pins</button>
                </div>
            </div>
            {viewType === "boards" ?
                <div className="user-board-listing">
                    {userBoardArray?.length ? userBoardArray.map(
                        (board) => (
                            <div>

                                <BoardCard board={board} />
                            </div>
                        )

                    ) : <div></div>}
                </div> :
                <div id="all-pins">
                    {
                        userPins.map((pin) => (
                            <div id={pin.id}>
                                <PinCard pin={pin} />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}
