import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllPins } from "../../../store/pinsReducer";
import './SearchResultsPage.css'
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import { PinDetailModal } from "../PinDetailModal";


export const SearchResultsPage = () => {
    const search = useParams().searchInput

    console.log("SEARCH", search)
    const dispatch = useDispatch()
    let searchpins = []
    const history = useHistory()

    const pins = useSelector((state) => state.pinsReducer.pins)
    console.log("PINS", pins)
    const pinArray = Object.values(pins)
    console.log("PINARRAY====", pinArray)

    if (search && pinArray.length) {
        pinArray.filter((pin) => {
            console.log("pin", pin.description)
            console.log("Search", search)
            if (pin.description.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else if (pin.title.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else if (pin.link.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else {
                console.log("NOTFOUND")
            }
        })
    }

    const goLandingPage = () => {
        history.replace('/')
    }

    useEffect(() => {
        dispatch(getAllPins())
    }, [dispatch])



    if (!pinArray.length) return null


    // if (!searchpins.length) return null

    return (

        <div>

            <div id="filter-reset" className="reset-filter-search-results" onClick={goLandingPage}>
                See All pins
            </div>



            {
                searchpins.length ? null : <div id='no-search-results'>No Search Results</div>
            }
            <div className='center-all-outer'>
                {
                    searchpins.length ? null : <NavLink id='no-search-link' to='/'>See all pins</NavLink>
                }
            </div>

            <div id='pinCard-holder-Allpins'>
                {/* {pins} */}
                <div id="all-pins">
                    {searchpins.map((pin) => (
                        <div id={pin.id}>
                            <div className="pin-photo">
                                {pin?.url ?
                                    <div className="pin-from-home">
                                        <OpenModalButton buttonText={<img alt="pin" className="landing-page-photo" src={pin.url}></img>} modalComponent={<PinDetailModal pinId={pin.id} />} />
                                        {/* <NavLink to={`/pins/${pin.id}`} pinId={pin.id}><img alt="pin" className="landing-page-photo" src={pin.url}></img></NavLink> */}
                                        {/* <OpenModalButton
                buttonText="Update"
                modalComponent={<UpdatePinModal pinId={thisPin.id} />}

            /> */}
                                    </div> :
                                    <div>
                                        This pin has no photo
                                    </div>
                                }

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}
