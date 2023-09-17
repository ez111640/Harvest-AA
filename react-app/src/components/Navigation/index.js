import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import CreateButton from "./CreateButton";

function Navigation({ isLoaded }) {
  // const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const pins = useSelector((state) => state.pinsReducer.pins)
  const [searchInput, setSearchInput] = useState("")
  const history = useHistory()
  let searchPins = []
  let pinArray = []
  console.log("PINS", pins)
  if (pins) pinArray = Object.values(pins)
  console.log("PINARRAY", pinArray)


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

  }
  const onClick = (e) => {
    e.preventDefault();
    if (searchInput) history.push(`/pins/search/${searchInput}`)
  }

  const onEnter = () => {
    if (searchInput) history.push(`/pins/search/${searchInput}`)
  }



  return (
    <div className="main-nav-bar">
      <div className="nav-bar-left">
        {user ? <NavLink exact to="/">
          <img src="https://i.ibb.co/rbztcLh/HAR-1.png" className="harvest-logo" alt="HAR-1" border="0"></img>
        </NavLink> :
          <div></div>
        }
        {user ?
          <div className="nav-bar-text-links">
            <NavLink exact to="/">Home</NavLink>
            <CreateButton />
          </div> :
          <div className="no-user-nav-links">
            <NavLink exact to="/">
              <img src="https://i.ibb.co/rbztcLh/HAR-1.png" className="harvest-logo" alt="HAR-1" border="0"></img>
            </NavLink>
          </div>
        }
      </div>
      <div className="search-bar">
        <button className="hide-that-button" onClick={onClick} >
          <i className="fa-solid fa-magnifying-glass" ></i>
        </button>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
          onKeyDown={(e) => (e.key === "Enter" ? onEnter() : false)}
        />
      </div>
      <div>
        <ProfileButton className="nav-link profile-button" user={user} />


      </div>
    </div >
  );
}

export default Navigation;
