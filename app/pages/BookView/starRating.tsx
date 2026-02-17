"use client"

import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rateBook } from '@/app/lib/mutate-data';
import { fetchRate } from '@/app/lib/fetching-data';

const StarRating = ({ bookId }: { bookId: string }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const queryClient = useQueryClient();

  const { data: rate } = useQuery({
    queryKey: ['rate', bookId],
    queryFn: () => fetchRate(bookId),
  });

  useEffect(() => {
    if (rate) {
      setRating(rate);
    }
  }, [rate]);

  function handleRating(rateNum: number) {
    setRating(rateNum)
    mutation.mutate({ rateNum, bookId });
  }

  const mutation = useMutation({
    mutationFn: ({ rateNum, bookId }: { rateNum: number; bookId: string }) =>
      rateBook(rateNum, bookId),

    onMutate: async ({ rateNum, bookId }) => {
      await queryClient.cancelQueries({ queryKey: ['rate', bookId] })

      const previousRate = queryClient.getQueryData(['rate', bookId])

      queryClient.setQueryData(['rate', bookId], rateNum)

      return { previousRate, bookId }
    },
    
    onError: (err, variables, context) => {
      if (context?.previousRate) {
        queryClient.setQueryData(['rate', context.bookId], context.previousRate)
      }
      console.error("Error submitting rating:", err);
    },
    
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rate', variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ["shelf"] })
      queryClient.invalidateQueries({ queryKey: ['bookDetail', variables.bookId] });
    },
  });

  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return (
          <label htmlFor="" key={i}>
            <input type="radio" className='hidden' name='starRating' value={ratingValue} />
            <StarIcon
              className={`w-6 h-6 hover:cursor-pointer `}
              style={{
                fill: ratingValue <= (hover || rating) ? '#0AA0A1' : 'transparent',
                stroke: '#0AA0A1',
                strokeWidth: 1,
              }}
              onMouseEnter={() => (setHover(ratingValue))}
              onMouseLeave={() => (setHover(0))}
              onClick={() => handleRating(ratingValue)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating