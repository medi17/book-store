'use client'

import { allGenres, genresWithbooks } from '../../lib/definition';
import '../../globals.css';
import SearchForGenres from './searchForGenres';
import BrowseGenres from '@/app/pages/genre/browseGenres';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGenres } from '@/app/lib/fetching-data';
import GenreCategory from './genreCatagory';



export default function Genre() {
    
    const {data: genresWbooks, isLoading, error} = useQuery<allGenres, Error>({
        queryKey:["genres"],
        queryFn: fetchAllGenres
    })

    const allGeners = genresWbooks ?? []

    return (
        <div className="w-fit mx-auto mt-5">
            <h2 className="text-2xl font-bold mt-8 mx-6 text-[#238E8E] ">Genres</h2>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 w-full p-4 sm:w-fit">
                <div className={"font-gabarito flex flex-col w-full lg:w-fit"}>
                    <SearchForGenres placeholder="Search..." />
                    <div>
                        { 
                            allGeners.map((genres: genresWithbooks, i) => (
                                <GenreCategory key= {i} genres = {genres}/>
                            ))
                        }
                    </div>

                </div>
                <div className="w-fit mt-8 lg:mt-0">
                    <h1 className="font-bold border-b-2 border-gray-600 pb-4 mb-4 lg:mb-1">Browse</h1>
                    <BrowseGenres />
                </div>
            </div>
        </div>
    )
}
