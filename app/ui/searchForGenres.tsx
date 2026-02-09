'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import '../globals.css'
import { useState } from 'react';

export default function SearchForGenres({ placeholder }: { placeholder: string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState('');

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams.toString());

      params.set('page', '1' );
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
  }, 3000)


  return (
    <div className=" flex gap-4 w-full  mb-10">
      <div className=" relative w-full">
        <label htmlFor="search" className="sr-only">
         Search
        </label>

        <input
          className="block rounded-md py-1 sm:py-1.5 pl-3 xs:pl-10 text-sm outline-2 placeholder:text-gray-500 w-full sm:h-8.5  focus:outline-[#0AA1A1]"
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <MagnifyingGlassIcon className="absolute right-3 xs:left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
        
      </div>

      <button 
        onClick={handleSearch}
        className="xs:block fancyBorder rounded-full  px-4 md:px-6"

      >search</button>

    </div>
  );
}