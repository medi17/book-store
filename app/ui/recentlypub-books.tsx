"use client";
import { useQuery } from "@tanstack/react-query";
import { conditionedBooks, bookDetailSchema} from "../lib/definition";
import "../globals.css";
import { fetchBooks } from "@/app/lib/fetching-data";

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
    <div className="flex flex-col w-full  mt-14 m-5 p-4 ">
      <div className={"font-gabarito flex flex-col w-full  mt-14  "}>
        <h2 className="text-2xl font-bold mb-4 text-[#238E8E] ">
          Recently Published
        </h2>

        <div className="flex  overflow-hidden overflow-x-auto no-scrollbar gap-3 p-5  ">
          {(recentBooks ?? []).map((book: bookDetailSchema) => (
            <div
              key={book.id}
              className=" shadow-md shrink-0 w-[120px] h-[248px] sm:w-40 sm:h-[300px] md:w-[220px] md:h-[400px] "
            >
              <div
                key={book.id}
                className="relative group shadow-md fancyBorderForHover"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-[184px] sm:h-[234px] md:h-[350px] sm:w-full  object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex  items-center justify-center flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-full flex sm:flex-col gap-3 justify-center items-center mb-6 sm:mb-10 ">
                    <img
                      src="../../favorite.png"
                      alt=""
                      className="w-7 h-7 sm:w-10 sm:h-10"
                    />
                    <span className="text-[12px] text-md pt-1 sm:pt-0 sm:text-md font-bold">
                      {book.averageRating} / 5
                    </span>
                  </span>
                  <p className="text-[14px] sm:text-lg font-bold mb-3">
                    {book.genres[0].name}
                  </p>
                  <Link
                    href={`/pages/BookView/${book.id}`}
                    className="fancyBorder rounded-lg bg-black text-[12px] text-md p-0.5 pl-2 sm:py-2 sm:px-10 "
                  >
                    View Detail
                  </Link>
                </div>
              </div>

              <h3 className="text-md font-bold ">{book.name}</h3>
              <p className="text-[13px] text-grey-300">
                by{" "}
                <span className={"font-handlee text-[#238E8E] "}>
                  {book.authors[0].name}
                </span>{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={"font-gabarito flex flex-col w-full  mt-14"}>
        <h2 className="text-2xl font-bold mb-4 text-[#238E8E] ">Top Rated</h2>
        <div className="flex  overflow-hidden overflow-x-auto no-scrollbar gap-3 p-5  ">
          {topBooks?.map((book: bookDetailSchema) => (
            <div
              key={book.id}
              className=" shadow-md shrink-0 w-[120px] h-[248px] sm:w-40 sm:h-[300px] md:w-[220px] md:h-[400px] "
            >
              <div
                key={book.id}
                className="relative group shadow-md fancyBorderForHover"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-[184px] sm:h-[234px] md:h-[350px] sm:w-full  object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex  items-center justify-center flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-full flex sm:flex-col gap-3 justify-center items-center mb-6 sm:mb-10 ">
                    <img
                      src="../../favorite.png"
                      alt=""
                      className="w-7 h-7 sm:w-10 sm:h-10"
                    />
                    <span className="text-[12px] text-md pt-1 sm:pt-0 sm:text-md font-bold">
                      {book.averageRating} / 5
                    </span>
                  </span>
                  <p className="text-[14px] sm:text-lg font-bold mb-3">
                    {book.name}
                  </p>
                  <Link
                    href={`/pages/BookView/${book.id}`}
                    className="fancyBorder rounded-lg bg-black text-[12px] text-md p-0.5 pl-2 sm:py-2 sm:px-10 "
                  >
                    View Detail
                  </Link>
                </div>
              </div>

              <h3 className="text-md font-bold ">{book.name}</h3>
              <p className="text-[13px] text-grey-300">
                by{" "}

                {book.authors.map((author) => (
                  <span key={book.id} className={"font-handlee text-[#238E8E] "}>
                    {author.name}
                  </span>
                ))}      
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
