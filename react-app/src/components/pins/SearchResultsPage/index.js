import './SearchResultsPage.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { getAllPins } from "../../../store/pinsReducer";
import { PinDetailModal } from "../PinDetailModal";
import OpenModalButton from "../../OpenModalButton";


export const SearchResultsPage = () => {
    const search = useParams().searchInput

    const dispatch = useDispatch()
    let searchpins = []
    const history = useHistory()

    const pins = useSelector((state) => state.pinsReducer.pins)
    const pinArray = Object.values(pins)

    if (search && pinArray.length) {
        pinArray.filter((pin) => {
            if (pin.description.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else if (pin.title.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else if (pin.link.toLowerCase().search(search) !== -1) {
                searchpins.push(pin)
            } else {
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

    const goBack = (e) => {
        e.preventDefault();
        window.location = ("/")
    }

    // if (!searchpins.length) return null

    return (

        <div className="search-pins">

            <div id="filter-reset" className="reset-filter-search-results" onClick={goLandingPage}>
                <div onClick={goBack} className="back-arrow"><i className="fa-solid fa-arrow-left-long"></i></div>

            </div>



            {
                searchpins.length ? null : <div id='no-search-results'>No Search Results</div>
            }

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
