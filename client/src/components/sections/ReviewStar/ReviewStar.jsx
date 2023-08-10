import React from 'react'
import "./ReviewStar.css"

export default function ReviewStar(props) {
    const stars = []
    for(let i = 0; i < props.review.stars; i++){
        stars.push(<i key={i}  className="fa fa-star"></i>);
    }

    return (
        <div className='review-star-page'>
            {stars}
            <div>({props.review.reviews} Reviews)</div>
        </div>
    )
}
