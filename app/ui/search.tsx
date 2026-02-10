'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import '../globals.css'
import { Dispatch, SetStateAction } from 'react';

export default function Search({
   placeholder, 
   isLoading, 
   setSearchOpen 
  }: { 
    placeholder: string; 
    isLoading: boolean; 
    setSearchOpen:Dispatch<SetStateAction<boolean>> 
  }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, 3000)

  return (
    <div className="flex gap-4 w-full justify-center">
      <div className="relative  overflow-hidden p-0.5">
        {isLoading &&(
          <div className='absolute inset-0 shimmer pointer-events-none rounded-md min-w-full h-full'></div>)
          }
      <div className="z-100 bg-opacity-50">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          onFocus={() => setSearchOpen(true)}
          className={`block rounded-md py-1 sm:py-1.5 pl-3 xs:pl-10 text-xs sm:text-sm  placeholder:text-gray-500 sm:h-[34px] w-[150px] xs:w-[300px] sm:w-[450px]  md:w-[650px] outline-2 ${isLoading ? '': 'focus:outline-[#0AA1A1]'}`}
          placeholder={placeholder}
          onChange={(e)=>{
            handleSearch(e.target.value)
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute right-3 xs:left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <button className="block text-xs sm:text-sm fancyBorder rounded-full px-2 sm:px-5 cursor-pointer">search</button>
      
    </div>
  );
}
