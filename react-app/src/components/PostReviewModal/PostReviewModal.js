import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/modal'
import { useState } from 'react'
import "./PostReviewModal.css"
import { postReview } from '../../store/reviews'
import Loading from '../Spots/Loading'

function PostReviewModal({ spotId}) {
    const [activeRating, setActiveRating] = useState(0)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const  history = useHistory();

    if(!spotId) return< Loading />;

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({})


        let stars = rating

        let reviewInfo = { review, stars }


        try {  await dispatch(postReview(spotId, reviewInfo))
            console.log("HERE")
            history.push(`/spots/${spotId}`)
            closeModal()
        }
        catch (e) {
            await setErrors(e)
            if(!stars) {
                setErrors({...e.err, stars: "Please select a rating"})
            }
            if(!review) {
                setErrors({...e.err, review: "Please enter your review"})
            }
        }
}





    return (
        <div className="review-modal">
            <h1>How was your stay?</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <textarea type="text" value={review} placeholder={"Leave your review here"}


                   onChange={e => setReview(e.target.value)}></textarea>
                    {errors.review && <p className = "error-class">{errors.review}</p>}
                <div className="ratingsArea">
                    <div
                        onMouseEnter={() => setActiveRating(1)}
                        onMouseLeave={() => setActiveRating(rating)}
                        onClick={() => setRating(1)}>
                        <i className={activeRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    </div>
                    <div
                        onMouseEnter={() => setActiveRating(2)}
                        onMouseLeave={() => setActiveRating(rating)}
                        onClick={() => setRating(2)}>
                        <i className={activeRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    </div>
                    <div
                        onMouseEnter={() => setActiveRating(3)}
                        onMouseLeave={() => setActiveRating(rating)}
                        onClick={() => setRating(3)}>
                        <i className={activeRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    </div>
                    <div
                        onMouseEnter={() => setActiveRating(4)}
                        onMouseLeave={() => setActiveRating(rating)}
                        onClick={() => setRating(4)}>
                        <i className={activeRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    </div>
                    <div
                        onMouseEnter={() => setActiveRating(5)}
                        onMouseLeave={() => setActiveRating(rating)}
                        onClick={() => setRating(5)}>
                        <i className={activeRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    </div>
                    <div>
                    <p>Stars</p>
                    </div>
                </div>
                <button className = "modal-submit" type="submit" disabled={review.length < 10 || !activeRating}>Submit Your Review</button>
            </form>
        </div>
    )

}

export default PostReviewModal;
