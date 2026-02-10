'use client';

import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../../globals.css'
import { useState } from 'react';
import { useSearchGenres } from '../../hooks/useSearchGenres';

export default function SearchForGenres({ placeholder }: { placeholder: string }) {

  const router = useRouter()
  const [term, setTerm] = useState('');

  const [selectedGenre, setSelectedGenre] = useState<{
    genreId: string;
    genreName: string;

  } | null>(null);

  const { data: data, isLoading, error } = useSearchGenres(term);

  const genres = data ?? []

  return (
    <div className=" flex gap-4 w-full mb-10">
      <div className=" relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        <input
          className={`block rounded-md py-1 sm:py-1.5 pl-3 xs:pl-10 text-sm placeholder:text-gray-500 sm:h-[34px]  w-[150px] xs:w-[300px] sm:w-[450px] outline-2 ${isLoading ? '' : 'focus:outline-[#0AA1A1]'}`}
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <MagnifyingGlassIcon className="absolute right-3 xs:left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />

        {
          genres && genres.length > 0 && (
            <ul className="absolute bg-black w-full mt-1 rounded-md z-10">
              {genres.map((genre) => (
                <li
                  key={genre.genreId}
                  onClick={() => {
                    setSelectedGenre(genre)
                    setTerm(genre.genreName)
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-700"
                >
                  {genre.genreName}
                </li>
              ))}
            </ul>
          )
        }
      </div>

      <button
        onClick={() => {
          if (!selectedGenre) return;

          router.push(
            `/pages/category?id=${encodeURIComponent(selectedGenre.genreId)}`
          );
        }}

        className="xs:block fancyBorder rounded-full  px-4 md:px-6"

      >search</button>

    </div>
  );
}