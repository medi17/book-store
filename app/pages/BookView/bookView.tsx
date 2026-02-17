"use client";
import "@/app/globals.css";
import { bookDetailSchema } from "@/app/lib/definition";
import StarRating from "./starRating";
import { addToShelf } from "@/app/lib/mutate-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import RatingsAndReviews from "./ratingsAndReviews";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { onlyDate } from "@/app/helper/date";
import Link from "next/link";
import Rating from "@/app/helper/rating";
import { useQuery } from '@tanstack/react-query';
import { fetchShelfBooks } from "@/app/lib/fetching-data";




export default function BookView({ bookDetail }: { bookDetail: bookDetailSchema; }) {
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToShelf,

    onMutate: async()=>{
      await queryClient.cancelQueries({queryKey:["shelf"]})

      const previousShelf = queryClient.getQueryData(["shelf"])

      queryClient.setQueryData(["shelf"], (old:any) => {
        return [...(old || []), bookDetail];
      })

      return { previousShelf }

    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shelf"] })
    },

    onError: (error) => console.error("❌ Upload failed:", error),
  });

  function handleAddtoShelf() {
    mutation.mutate(bookDetail.id);
  }

  const [summaryOpen, setSummaryOpen] = useState<boolean>(false)
  
  const { data: shelf } = useQuery({
    queryKey: ['shelf'],
    queryFn: fetchShelfBooks,
  });

  const isAlreadyOnShelf = shelf?.some(
    (book: any) => book.id === bookDetail.id
  );


  return (
    <div className="container ">
      <div className="flex flex-col md:flex-row md:gap-15 md:ml-15 md:mt-10 md:mr-10 xs:max-w-[500px] xs:mx-auto sm:max-w-[650px] md:max-w-full  ">
        <div className="font-gantari md:sticky md:top-15 md:left-0 md:h-screen flex p-3 gap-2 xs:gap-6 md:flex-col md:items-center">
          <img
            src={bookDetail.image}
            alt=""
            width={120}
            height={200}
            className="w-[120px] h-[200px] md:w-[340px] md:h-[340px] "
          />
          <div className="flex flex-col gap-2  md:items-center md:w-full">
            <span className="flex order-2">
              <StarRating bookId={bookDetail.id} />
            </span>
            <p className="text-[12px] order-3 typeWritterEffect  ">
              Rate the Book!
            </p>
            <div className="gap-4 w-full text-xs order-1">
              <button
                className={`fancyBorder w-full mb-2 py-1.5 px-5
                  ${isAlreadyOnShelf ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                disabled={isAlreadyOnShelf || mutation.isPending}
                onClick={() => {
                  handleAddtoShelf();
                }}
              >
                {
                  isAlreadyOnShelf
                    ? "Book in Shelf"
                    : mutation.isPending
                    ? "Adding..."
                    : "Add to Shelf"
                }
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-gantari pt-1 gap-8 w-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 ">
              <h1 className="font-semibold text-4xl text-cyan-700 ">
                {bookDetail.name}
              </h1>
              <p className="text-lg">
                {bookDetail.authors.map((author) => author.name)}
              </p>
              <div className="flex gap-3 items-start">
                <Rating rateNum={bookDetail.averageRating} className='w-6'/>
                <span className="flex gap-2 w-fit text-[7px] lg:text-[12px]">
                  <p className="text-gray-500">
                    {bookDetail.ratingCount} ratings
                  </p>
                  <p className="text-gray-500">
                    {bookDetail.reviewCount} reviews
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="">
                <p className="text-[16px] text-gray-400">
                  {bookDetail.description} 
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] flex gap-3">
                  <span className="text-gray-600">First Published Date</span>
                  <span className="font-bold">
                    {onlyDate(bookDetail.firstPublishedDate)}
                  </span>
                </p>
                <p className="text-[16px] flex gap-3">
                  <span className="text-gray-600">Publisher</span>
                  <span className="font-bold">{bookDetail.publishers.map((publisher) => publisher.name)}</span>
                </p>
                <div className="text-[16px] flex gap-3">
                  <span  className="text-gray-600">Genre</span>
                  {bookDetail.genres.map((genre) => (
                    <Link key={genre.id} href={`/pages/category?id=${encodeURIComponent(genre.id)}`}>
                      <p key={genre.id} className="font-bold cursor-pointer hover:underline decoration-cyan-500 ">{genre.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="pb-5">
            <div 
              onClick={()=>{
                setSummaryOpen((prevState) => !prevState)
              }}
              className="flex items-end gap-3 cursor-pointer text-cyan-500 underline">
              
              <p>Short summary</p>
              <span className={`text-xs ${summaryOpen && 'rotate-180'}`}>
                <ChevronDown />
              </span>
            </div>
            <div className={summaryOpen ? 'block' : 'hidden'}>
              <p className="text-sm text-gray-400 my-5 border p-3 rounded-xl">
                {bookDetail.summary}
              </p>
            </div>
          </div>
          <RatingsAndReviews bookDetail={bookDetail} />
        </div>
      </div>
    </div>
  );
}
