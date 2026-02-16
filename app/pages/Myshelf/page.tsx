"use client"

import { bookDetailSchema } from "@/app/lib/definition";
import { useQuery } from '@tanstack/react-query';
import { fetchShelfBooks } from "@/app/lib/fetching-data";
import Rating from "../../helper/rating";
import { onlyYear } from "@/app/helper/date";


export default function MyShelf(){
    
    const { data: shelf, isLoading, error } = useQuery({
        queryKey: ['shelf'],
        queryFn: fetchShelfBooks,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true, // or false if you don’t want it
        refetchOnReconnect: true,
        refetchOnMount: false,
        retry: false,
    });

    if (isLoading){ return <p>Loading shelf...</p>}

    if (error) return <p>Failed to load shelf</p>;

    return(
        <div className="w-full  flex flex-col justify-center ">
            <h1 className="font-bold text-2xl my-8 px-5 sm:ml-10 text-cyan-600">My Shelf</h1>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5 md:px-15 justify-between items-center w-full">

                {shelf?.map((book: bookDetailSchema) =>(
                    <div key={book.id} className="flex flex-col md:flex-row md:items-center gap-8 max-w-[480px] px-5 py-3 bg-black border-[0.15] border-gray-700 rounded-lg">
                        <div className="">
                            <img src={book.image} alt="" className="w-[90px] h-[135px] "/>
                        </div>
                        <div className="flex flex-col grow-0 gap-1 w-fit">
                            <p className=""><span className="text-gray-500 mr-1">Title: </span>{book.name}</p>
                            <p className=""><span className="text-gray-500 mr-1">Author: </span>{book.authors.map((author) => author.name)}</p>
                            <p className=""><span className="text-gray-500 mr-1">Published: </span>{onlyYear(book.firstPublishedDate)}</p>
                            <div className="flex"><span className="text-gray-500 mr-1">Rating: </span> 
                                <Rating rateNum={book.averageRating} className='w-6'/>
                            </div>
                        </div>
                    </div>
                ) )}
            </div>
        </div>
    )
}