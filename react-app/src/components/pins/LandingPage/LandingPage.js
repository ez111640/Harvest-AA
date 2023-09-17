import "./LandingPage.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import { getAllComments } from "../../../store/commentsReducer"
import { getUserBoards } from "../../../store/boardsReducer"
import { PinDetailModal } from "../PinDetailModal"
import OpenModalButton from "../../OpenModalButton"

export const LandingPage = () => {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const user = useSelector((state) => state.session.user)


    let allPinArray = []
    if (allPins) allPinArray = Object.values(allPins)


    let sortedPins = []
    if (allPinArray.length) allPinArray.map((pin) => sortedPins[pin.id] = pin)


    useEffect(() => {
        dispatch(getAllPins())
        dispatch(getAllComments())
        dispatch(getUserBoards())
    }, [dispatch])

    if (!allPins) return null;

    return (
        <div>
            {user ?
            <div className="greeting-banner" >
                Welcome back, {user.firstName ? user.firstName : user.username}!
                </div>
                    :
                    <div className="greeting-banner-no-user"></div>
                }
            {allPinArray ? <div id="all-pins">
                {sortedPins.map((pin) => (
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
            </div> :
                <div></div>
            }
        </div>
    )
}
