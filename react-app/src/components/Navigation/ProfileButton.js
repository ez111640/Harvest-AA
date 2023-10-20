import './navigation.css'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/";
import { getUserBoards } from "../../store/boardsReducer";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const boards = useSelector((state) => state.boardsReducer.boards)

  const openMenu = () => {
    if (user)
      dispatch(getUserBoards())
    if (showMenu) return;
    setShowMenu(true);
  };

  let firstLetter
  if (user) {
    if (user.firstName) firstLetter = user.firstName[0].toUpperCase()
    else firstLetter = user.username[0].toUpperCase()
  }

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
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {!user ?
        <button className="user-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button> :
        <button className="user-button" onClick={openMenu}>

          <div className="a-user-letter">{firstLetter}</div>
        </button>
      }
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div id='profile-dropdown-profile-butt'>
            <div className="profile-dropdown-li">Hello, {user.username}!</div>
            <div className="profile-dropdown-li view-profile-button"><Link to="/boards">View Profile</Link></div>
            <div className="profile-dropdown-li">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
