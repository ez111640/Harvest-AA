import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../boards/UserBoards/CreateBoardModal";
import SelectImageSourceModal from "../pins/SelectImageSourceModal";
import './navigation.css'
import { getUserBoards } from "../../store/boardsReducer";
import { Link } from "react-router-dom";

function CreateButton() {
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
      <button className="hide-that-button" onClick={openMenu}>
        <div className="create-button ">
          Create<i className="make-bold fa-solid fa-chevron-down" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div id='profile-dropdown-profile-butt' className="create-dropdown-options">
          <OpenModalButton buttonText="Create Board" modalComponent={<CreateBoardModal />} />
          <Link to="/pins/new" onClick={closeMenu}>Create Pin</Link>
        </div>

      </ul>
    </>
  );
}

export default CreateButton;
