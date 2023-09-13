import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPins } from "../../../store/pinsReducer"
import "./UserPins.css"
import { PinCard } from "../PinCard/PinCard"
import { getAllComments } from "../../../store/commentsReducer"
import { getUserBoards } from "../../../store/boardsReducer"
import { NavLink } from "react-router-dom"

export const UserPins = () => {
    const dispatch = useDispatch()
    const allPins = useSelector((state) => state.pinsReducer.pins)
    const boards = useSelector((state) => state.boardsReducer.boards)
    const user = useSelector((state) => state.session.user)


    const allPinArray = Object.values(allPins)
    let userPins = allPinArray.filter((pin) => pin.userId === user.id)

    useEffect(() => {
        dispatch(getAllPins())
        dispatch(getAllComments())
        dispatch(getUserBoards())
    }, [dispatch])

    if (!allPins) return null;

    return (
        <div>
            {allPinArray ? <div id="all-pins">
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
