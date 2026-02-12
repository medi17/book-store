"use client";

import {use } from "react"
import BookView from "../bookView";
import { fetchBookDetail } from "@/app/lib/fetching-data";
import { useQuery } from "@tanstack/react-query";
import type { bookDetailSchema } from "@/app/lib/definition"; // adjust type import


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 

  const {
    data: bookDetail,
    isLoading,
    error,
  } = useQuery<bookDetailSchema>({
    queryKey: ["bookDetail", id],
    queryFn: () => fetchBookDetail({ bookId: id }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }
  
  if (error) return <div>Error loading book</div>;
  if (!bookDetail) return <div>Book not found</div>;

  return (
    <div className="flex flex-col pb-18 border">
      <BookView bookDetail={bookDetail} />
    </div>
  );
}
