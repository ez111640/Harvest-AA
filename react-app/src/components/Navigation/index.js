import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";

function Navigation({ isLoaded }) {
  // const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const pins = useSelector((state) => state.pinsReducer.pins)
  const [searchInput, setSearchInput] = useState("")
  const history = useHistory()
  let searchPins = []
  let pinArray = []

  // if(pins) pinArray = Object.values(pins)
  let sortedPins = []
  if (pinArray.length) pins.map((pin) => sortedPins[pin.id] = pin)
  console.log(sortedPins)


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    // if (searchInput.length) {
    //   pinArray?.filter((pin) => {
    //     if (pin.description.toLowerCase().search(searchInput.toLowerCase()) !== -1) {
    //       searchPins.push(pin)
    //     } else if (pin.name.toLowerCase().search(searchInput.toLowerCase()) !== -1) {
    //       searchPins.push(pin)
    //     } else {

    //     }
    //   })
    // }
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
      <div>
        <NavLink exact to="/">
          <img src="https://i.ibb.co/rbztcLh/HAR-1.png" className="harvest-logo" alt="HAR-1" border="0"></img>
        </NavLink>
      </div>
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
          onKeyDown={(e) => (e.key === "Enter" ? onEnter() : false)}
        />
        <button className="hide-that-button" onClick={onClick} ><i className="fa-solid fa-magnifying-glass" ></i></button>
      </div>
      <div>
        <ProfileButton className="nav-link profile-button" user={sessionUser} />


      </div>
    </div>
  );
}

export default Navigation;
