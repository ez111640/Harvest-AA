import "./UserPins.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllPins } from "../../../store/pinsReducer"
import { getUserBoards } from "../../../store/boardsReducer"
import { getAllComments } from "../../../store/commentsReducer"
import { PinCard } from "../PinCard/PinCard"
import {PageHeader} from "../../auth/User/PageHeader"

export const UserPins = () => {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const boards = useSelector((state) => state.boardsReducer.boards)
    const user = useSelector((state) => state.session.user)

    let location = window.location.href

    const allPinArray = Object.values(allPins)
    let userPins = allPinArray.filter((pin) => pin.userId === user.id)

    useEffect(() => {
        dispatch(getAllPins())
        dispatch(getAllComments())
        dispatch(getUserBoards())
    }, [dispatch])

    if (!allPins) return null;

    return (
        <div >
           {!location.includes("boards" ) && <PageHeader />}
           {!location.includes("boards") ? <div className="new-pin-created">Success! Pin created!</div>:<div></div>}

            {allPinArray ? <div id="all-user-pins">
                {userPins.map((pin) => (
                    <div id={pin.id}>
                        <div className="pin-photo">
                            {pin?.url ?
                                <div>
                                    <NavLink to={`/pins/${pin.id}`} pinId={pin.id}><img alt="pin" src={pin.url}></img></NavLink>
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
