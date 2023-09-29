import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBoards } from "../../../store/boardsReducer"
import { BoardCard } from "./BoardCard/BoardCard";
import "./UserBoards.css"
import { PageHeader } from "../../auth/User/PageHeader";
import { useHistory } from "react-router-dom";
import { UserPins } from "../../pins/UserPins";
import { getAllPins } from "../../../store/pinsReducer";
import OpenModalButton from "../../OpenModalButton";




export const UserBoards = () => {
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    if (!user) history.push("/")
    const pins = useSelector((state) => state.pinsReducer.pins)
    const allBoards = useSelector((state) => state.boardsReducer.boards)

    const dispatch = useDispatch()


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


    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const openMenu = () => {
        dispatch(getUserBoards())
        if (showMenu) return;
        setShowMenu(true);
    };

    const ulClassName = "select-edit-board-type-dropdown" + (showMenu ? "" : " hidden");

    useEffect(() => {

        if (!showMenu) return;

        const closeMenu = (e) => {
                setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dispatch, showMenu]);

    const clickEditProfileButton = (e) => {
        e.preventDefault()
        history.push("/profile")
    }


    let allBoardArray;
    if (allBoards) allBoardArray = Object.values(allBoards)
    const userBoardArray = allBoardArray.filter((board) => board.userId === user.id)

    const pinArray = Object.values(pins)
    let userPins = pinArray.filter((pin) => pin.userId === user.id)

    if (!pins) return null
    return (
        <div>
            <PageHeader />
            <div className="update-board-button">
                <button className="select-edit-board-button" onClick={openMenu}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
                <ul className={ulClassName} ref={ulRef}>
                    <div className="edit-bn-lp">
                        <button onClick={clickEditProfileButton}>Edit Profile</button>
                    </div>

                </ul>
                {/* <SelectEditBoardOption /> */}
            </div>
            <div className="view-type-button-div">
                <div className="view-type-buttons">
                    <button type="button" className={"board-button " + boardsActive} onClick={showBoards}>Boards</button>
                    <button type="button" className={"pins-button " + pinsActive} onClick={showPins}>Pins</button>
                </div>
            </div>
            {viewType === "boards" ?
                <div>
                    {userBoardArray?.length ?

                        <div className="user-board-listing">
                            {userBoardArray.map(
                                (board) => (
                                    <div value={board.id}>

                                        <BoardCard board={board} />
                                    </div>
                                )

                            )}
                        </div>
                        : <div className="new-user-no-boards">
                            You haven't created any boards yet. Click "New Board" to get started!
                        </div>

                    }
                </div> :
                <UserPins />
            }
        </div>
    )
}
