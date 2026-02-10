import "@/app/globals.css";
import { Genre, genreList } from "@/app/lib/definition";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchGenreList } from '@/app/lib/fetching-data';


export default function BrowseGenres() {

    const {data: genres, isLoading, error} = useQuery<genreList, Error>({
        queryKey:["genres"],
        queryFn: fetchGenreList
    })

    const allGeners = genres ?? []

    return (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-3 lg:mt-4 h-fit w-fit mr-auto px-4 mt-8">
            {allGeners.map((genre: Genre) => (
                <Link key={genre.id} href={`/pages/category?id=${encodeURIComponent(genre.id)}`}>
                    <p className="text-cyan-400 text-[12px]">
                        {genre.name}
                    </p>
                </Link>
            ))}
        </div>    
    )
}