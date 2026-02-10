import Link from "next/link";
import { partialBookSchema } from "../lib/definition";



export default function BookCardForGenre({book}: {book: partialBookSchema}) {
    return(
        <div key={book.id} className={`shadow-md shrink-0 w-30 h-62 sm:w-35 md:h-70`}>
            <div key={book.id} className="relative group shadow-md fancyBorderForHover">
                <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-[184px] sm:h-[234px] object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex  items-center justify-center flex-col gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                
                    <span className="w-full flex flex-col gap-1 justify-center items-center mb-3">
                        <img
                            src="../../favorite.png"
                            alt=""
                            className="w-7 h-7"
                        />

                        <span className="text-sm pt-1 font-bold">
                            {book.averageRating} / 5
                        </span>
                    </span>

                    <div className="text-sm font-bold mb-3 text-center">
                        {book.genres.map((genre) => (
                            <p key={genre.id} >
                                {genre.name}
                            </p>
                        ))}
                    </div>
                    <Link
                        href={`/pages/BookView/${book.id}`}
                        className="fancyBorder rounded-lg bg-black text-[10px]  px-2 py-1 sm:px-5"
                    >                        
                        View Detail
                    </Link>
                    
                </div>
            </div>

            <h3 className="text-md font-bold ">{book.name}</h3>
            <p className="text-[13px] text-grey-300">
                by{" "}
                <span className={"font-handlee text-[#238E8E] "}>
                    {book.authors.map((author)=> author.name).join(",")}
                </span>{" "}
            </p>
        </div>
    )
}