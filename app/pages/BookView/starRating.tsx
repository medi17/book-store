"use client"

import {useState} from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { useMutation } from "@tanstack/react-query";
import { rateBook } from '@/app/lib/mutate-data';


const StarRating = ({bookId}:{bookId: string}) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleRating(rateNum:number){
    setRating(()=>(rateNum))

    mutation.mutate({rateNum, bookId}); 
  }

  const mutation = useMutation({
    mutationFn: ({ rateNum, bookId }: { rateNum: number; bookId: string }) =>
      rateBook(rateNum, bookId),

    onSuccess: (data) => {
      console.log("Rating submitted:", data);
    },
    onError: (err) => {
      console.error("Error submitting rating:", err);
    },
  });
  
    
  return(
      <div className="flex">
          { [...Array(5)].map((star, i) =>{
            const ratingValue = i + 1
              return  (
              
                <label htmlFor="" key={i}>
                      <input type="radio" className='hidden' name='starRating' value={ratingValue} />
                      <StarIcon
                        className={`w-6 h-6 hover:cursor-pointer `}
                        style={{
                          fill: ratingValue <= (hover || rating) ? '#0AA0A1' : 'transparent',
                          stroke: '#0AA0A1',
                          strokeWidth: 1,
                        }}
                        onMouseEnter={()=>(setHover(ratingValue))}
                        onMouseLeave={()=>(setHover(0))}
                        onClick={() => handleRating(ratingValue)}
                      />
                  </label>)
            })} 
      </div>
  )
}

export default StarRating;