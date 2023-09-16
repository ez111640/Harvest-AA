import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getBoardDetails, getUserBoards } from "../../../store/boardsReducer"
import { BoardCard } from "./BoardCard/BoardCard";
import "./UserBoards.css"
import { PageHeader } from "../../auth/User/PageHeader";

import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserPins } from "../../pins/UserPins";
import { getAllPins } from "../../../store/pinsReducer";




export const UserBoards = () => {
    const history = useHistory()
    const board = useSelector((state) => state.boardsReducer.boards)
    const user = useSelector((state) => state.session.user)
    if (!user) history.push("/")
    const pins = useSelector((state) => state.pinsReducer.pins)
    const userBoards = useSelector((state) => state.boardsReducer.boards)
    const dispatch = useDispatch()


    console.log("USERBOARDS", userBoards)
    const [viewType, setViewType] = useState('boards')
    const [pinsActive, setPinsActive] = useState('inactive-option')
    const [boardsActive, setBoardsActive] = useState('active-option')


    // const { closeModal } = useModal()

    // window.onbeforeunload = function () {
    //     window.setTimeout(function () {
    //         window.location = '/boards';
    //     }, 0);
    //     window.onbeforeunload = null;
    // }



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

    useEffect(() => {
        dispatch(getUserBoards())
        dispatch(getAllPins())
    }, [dispatch])


    let userBoardArray;
    if (userBoards) userBoardArray = Object.values(userBoards)
    const pinArray = Object.values(pins)
    let userPins = pinArray.filter((pin) => pin.userId === user.id)
    console.log(userBoardArray)
    console.log("userPins", userPins)

    if (!pins) return null
    if (!userBoardArray.length) return null;
    return (
        <div>
            <PageHeader />
            <div className="view-type-button-div">
                <div className="view-type-buttons">
                    <button type="button" className={"board-button " + boardsActive} onClick={showBoards}>Boards</button>
                    <button type="button" className={"pins-button " + pinsActive} onClick={showPins}>Pins</button>
                </div>
            </div>
            {viewType === "boards" ?
                <div className="user-board-listing">
                    {userBoardArray?.length ? userBoardArray.map(
                        (board) => (
                            <div value={board.id}>

                                <BoardCard board={board} />
                            </div>
                        )

                    ) : <div></div>}
                </div> :
                <UserPins />
            }
        </div>
    )
}
