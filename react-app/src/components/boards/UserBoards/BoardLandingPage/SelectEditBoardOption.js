import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/session"
import OpenModalButton from "../../../OpenModalButton"
import CreateBoardModal from "../CreateBoardModal"
import { getUserBoards } from "../../../../store/boardsReducer"
import UpdateBoardModal from "../../UpdateBoardModal";

function SelectEditBoardOption() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const boards = useSelector((state) => state.boardsReducer.boards)

  const openMenu = () => {
    dispatch(getUserBoards())
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {

    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="select-edit-board-button" onClick={openMenu}>
          <i className="fa-solid fa-ellipsis"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div id='profile-dropdown-profile-butt' className="create-dropdown-options">
          <OpenModalButton buttonText="Edit Board Name" modalComponent={<UpdateBoardModal />} />
          <button type="button">Edit Pins</button>
          <button type="button">Edit Topics</button>
        </div>

      </ul>
    </>
  );
}

export default SelectEditBoardOption;
