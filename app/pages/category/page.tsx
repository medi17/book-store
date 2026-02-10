'use client'

import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import { getGenre } from "@/app/hooks/useGenresDatas";
import BookCardForGenre from "@/app/ui/bookCardForGenre";
import BrowseGenres from "../genre/browseGenres";

export default function Category(){

        
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || ""

  const { data: genre, isLoading, error } = getGenre(id);

  const books = genre?.books ?? [];

  return (
    <div className="w-fit mx-auto mt-2">
      <h2 className="text-sm font-bold mx-4 text-[#238E8E] ">Genres</h2>
      <div className="flex flex-col lg:flex-row lg:justify-around lg:gap-8 w-full p-4 sm:w-fit">
        <div className={"flex flex-col w-full lg:w-fit font-gabarito"}>
          <h1 className="font-bold text-3xl">{genre?.genreName}</h1>
          <p className="text-sm max-w-150">
            {genre?.genreDescription}
          </p>
          <p className="text-xs font-bold my-3 ">
            Released tagged `{genre?.genreName}`
          </p>
          <div className="flex justify-start items-center  max-w-150">
            <div className="grid grid-cols-4 gap-1">
              {
                books.map((book) => (
                  <BookCardForGenre key={book.id} book={book}/>
                ))
              }
            </div>
          </div>
        </div>
        <div className="w-fit mt-8 lg:mt-0">        
          <h1 className="font-bold border-b-2 border-gray-600 pb-4 mb-4 lg:mb-1">Browse</h1>
          <BrowseGenres />
        </div>
      </div>
    </div>
  );
}