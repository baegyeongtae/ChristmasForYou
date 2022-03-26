import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactStars from "react-rating-stars-component";
import { useRecoilValue } from 'recoil';
import { loginState } from '../../Pages/Recoil/Atoms';
import axios from 'axios';
import Modal from '../Modal/Modal'

function Star(props) {

    const LogInChecker = useRecoilValue(loginState);
    const movieId = useParams().movie_id
    const [rating, setRating] = useState(0) 
    const [postResult, setPostResult] = useState()
    
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    
    const postRating = async(rating) => {
        if(LogInChecker === true && rating > 0) {
            const response = await axios.post(`http://localhost:5000/movies/${movieId}/rating`, {
                rating: `${rating}` / 10
            }, { withCredentials : true})
            setPostResult(response)
        } else {
            alert('로그인 후 이용해주세요!')
        }
    }

    
    return (
        <div className="mt-8 flex justify-center">
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            {postResult ? 
                <Modal visible={true}/> : null}
        </div>
    )
}

export default Star;
