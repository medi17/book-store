"use client";

import "@/app/globals.css";
import { bookDetailSchema } from "@/app/lib/definition"
import { useState } from "react";
import ReviewCard from "./reviewCard";
import { useSession } from "@/app/lib/auth-client";

export default function RatingsAndReviews({ bookDetail }: { bookDetail: bookDetailSchema }) {

  const [review, setReview] = useState("");
  const {data: session} = useSession()
  const user = session?.user

  return (
    <div>
      <div className="my-5">
        <h2 className="text-3xl text-cyan-500 font-black">Ratings &amp; Reviews</h2>
        <div className={user?"block":"hidden"}>          
          <div className="flex flex-col items-start pt-3 mb-5">
            <textarea
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
              name="review"
              id="review"
              className="custom-scrollbar text-sm w-90 h-40 border border-gray-400 rounded-xl my-5 p-3 focus:outline-none focus:ring-1 focus:ring-cyan-400  focus:border-cyan-400"></textarea>
            <button
              className="fancyBorder text-xs md:text-sm mb-2 py-1.5 px-5 md:px-15 cursor-pointer"
              onClick={() => {
                // addToShelf(bookDetail);
                // handleAddtoShelf();
              }}
            >
              Add review
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl text-gray-300 pb-3 font-black">Community Reviews</h2>
        <p className="text-gray-600 text-sm mb-5">Displaying 1-10 0f 150 reviews</p>
        <div className="flex flex-col gap-8">
          {
            bookDetail.reviewsAndRatings.map((review, index) => (
              <ReviewCard
                key={index}
                userImage={review.userImage}
                userId={review.userId}
                userName={review.userName}
                userRole={review.userRole}
                rateValue={review.rateValue}
                reviewText={review.reviewText}
                reviewTextCreatedTime={review.reviewTextCreatedTime}
              />
            ))
          }
        </div>

        <p className="text-cyan-600 text-center my-5 hover:underline decoration-cyan-600 cursor-pointer">More reviews...</p>
      </div>
    </div>
  )
}