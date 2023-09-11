import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../../store/commentsReducer"

export const AllComments = () => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.commentsReducer.comments)
    console.log(comments)


    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    return (

        <div>HERE</div>
    )
}
