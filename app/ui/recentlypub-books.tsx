"use client";
import { useQuery } from "@tanstack/react-query";
import { conditionedBooks, bookDetailSchema} from "../lib/definition";
import "../globals.css";
import BookCard from "./bookCard";
import Link from "next/link";
import {fetchRecentlyPublished, fetchTopRated } from "@/app/lib/fetching-data";

export default function RecentlyPublishedBooks() {

  const { data: recentBooks, isLoading, error } = useQuery<conditionedBooks, Error>({
    queryKey: ["recentBooks"],
    queryFn: fetchRecentlyPublished,
  });

  const { data: topBooks, isLoading: isTopBooksLoading, error: topBooksError } = useQuery<conditionedBooks, Error>({
    queryKey: ["topBooks"],
    queryFn: fetchTopRated,
  });

  return (
    <div className="flex flex-col w-full md:mt-14 sm:my-5 p-4 ">
      <div className={"font-gabarito flex flex-col w-full my-14"}>
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-[#238E8E] ">
          Recently Published
        </h2>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
          {(recentBooks ?? []).map((book: bookDetailSchema) => (
            <BookCard book={book} key={book.id}/>
          ))}
        </div>
      </div>
      <div className={"font-gabarito flex flex-col w-full  mt-14"}>
        <h2 className="text-2xl font-bold mb-4 text-[#238E8E] ">Top Rated</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
          {topBooks?.map((book: bookDetailSchema) => (
            <BookCard book={book} key={book.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
