import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../../store/commentsReducer"

export const AllComments = () => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.commentsReducer.comments)
    

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    return (
        <>

            <ul >
                    <div id='profile-dropdown-profile-butt'>
                        <div className="profile-dropdown-li"></div>
                        <div className="profile-dropdown-li view-profile-button"></div>
                        <div className="profile-dropdown-li">
                        </div>
                    </div>
            </ul>
        </>
    )
}
