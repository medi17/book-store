"use client";
import "@/app/globals.css";
import { StarIcon, UserIcon } from "@heroicons/react/24/outline";
import { bookDetailSchema } from "@/app/lib/definition";
import Link from "next/dist/client/link";
import Myshelf from "../Myshelf/page";
import { useShelfStore } from "@/store/shelfStore";
import BookViewCatagory from "./bookViewCatagory";
import StarRating from "./starRating";
import Image from "next/image";
import { addtoShelf } from "@/app/lib/fetching-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export default function BookView({ bookDetail }: { bookDetail: bookDetailSchema; }) {
  
  const addToShelf = useShelfStore((state) => state.addToShelf);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { bookId: string }) => {
      return addtoShelf(payload.bookId);
    },
    onSuccess: (data) => {
      console.log("✅ Book added to shelf:", data);
      queryClient.invalidateQueries({ queryKey: ["shelf"] }); // maybe invalidate shelf instead of genres
    },
    onError: (error) => console.error("❌ Upload failed:", error),
  });

  function handleAddtoShelf() {
    mutation.mutate({ bookId: bookDetail.id });
  }
  
  return (
    <div className="container ">
      <div className="flex flex-col md:flex-row mt-10  xs:max-w-[500px] xs:mx-auto sm:max-w-[650px] md:max-w-full  md:mx-5  ">
        <div className="flex p-3 gap-2 w-full xs:gap-6 md:flex-col md:max-w-[500px]   md:items-center md:left-10  ">
          <img
            src={bookDetail.image}
            alt=""
            width={120}
            height={200}
            className="w-[120px] h-[200px] md:w-[220px] md:h-[300px] "
          />
          <div className="flex flex-col gap-2  md:items-center ">
            <span className="flex order-2">
              <StarRating bookId={bookDetail.id} />
            </span>
            <p className="text-[12px] order-3 typeWritterEffect  ">
              Rate the Book
            </p>
            <div className="gap-4 w-fit order-1">
              <button
                className="fancyBorder w-full mb-4 py-1"
                onClick={() => {
                  console.log("Adding bookDetail:", bookDetail);
                  addToShelf(bookDetail);
                  handleAddtoShelf();
                }}
              >
                Add to shelf
              </button>
              <button className="fancyBorder w-full py-1">Mark as read</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-gantari p-3 gap-8  md:max-w-[800px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 ">
              <h1 className="font-semibold text-3xl text-cyan-700 ">
                {bookDetail.name}
              </h1>
              <p className="text-lg">
                {bookDetail.authors.map((author) => author.name)}
              </p>
              <div className="flex gap-3">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6" />
                  ))}
                </span>
                <span className="flex sm:flex-col w-fit text-[7px] lg:text-[12px]">
                  <p className="text-gray-500">
                    {bookDetail.reviewsAndRatings?.length ?? 0} ratings
                  </p>
                  <p className="text-gray-500">
                    {bookDetail.reviewsAndRatings?.length ?? 0} reviews
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="">
                <p className="text-[16px] text-gray-400">
                  A gothic masterpiece of tempestuous passions and dark secrets,
                  Charlotte Bronte&apos;s <em>Jane Eyre</em> is edited with an
                  introduction and notes by Stevie Davis in Penguin Classics.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] flex gap-3">
                  <span className="text-gray-600">First Published</span>
                  <span className="font-bold">
                    {bookDetail.publishers.map((pub) => pub.name)}
                  </span>
                </p>
                <p className="text-[16px] flex gap-3">
                  <span className="text-gray-600">Publisher</span>
                  <span className="font-bold">Penguin Classics</span>
                </p>
                <p className="text-[16px] flex gap-3">
                  <span className="text-gray-600">Genre</span>
                  {bookDetail.genres.map((genre) => (
                    <span className="font-bold ">{genre.name}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookViewCatagory bookId={bookDetail} />
    </div>
  );
}
