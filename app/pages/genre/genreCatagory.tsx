'use client'

import { genresWithbooks, partialBookSchema } from '../../lib/definition';
import '../../globals.css'
import Link from "next/link"
import BookCardForGenre from '@/app/ui/bookCardForGenre';


export default function GenreCategory({ genres }: { genres: genresWithbooks}) {

    const books = genres?.books ?? []

    return (
        <div className="flex flex-col ">
            <h1 className="font-bold my-5 mt-6">{genres.genreName}</h1>
            <div className="flex flex-wrap justify-start items-center gap-4 max-h-[566px] max-w-[600px] overflow-hidden overflow-y-auto no-scrollbar md:overflow-y-hidden  md:flex-nowrap md:overflow-x-auto  md:mx-2">
                {
                    books.map((book: partialBookSchema) => (
                        <BookCardForGenre book={book} key={book.id}/>
                    ))
                }
            </div>
            <div className=''>
                <Link  href={`/pages/category?id=${encodeURIComponent(genres.genreId)}`} >

                    <p className="ml-auto my-3 text-sm w-fit text-cyan-600">
                        More {genres?.genreName?.toLowerCase()}...
                    </p>

                </Link>
            </div>
        </div>
    )
}