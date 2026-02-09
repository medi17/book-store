import { Book } from '../../lib/definition';
import '../../globals.css';
import Link from "next/link";
import SearchForGenres from '../../ui/searchForGenres';
import Image from 'next/image'
const bookGenres = ['Fantasy', 'Science ', 'Romance', 'Mystery', 'Thriller', 'Horror', 'Historical', 'Adventure', 'Literary Fiction', 'Young Adult', 'Children\'s Books', 'Contemporary Fiction', 'Graphic Novels', 'Dystopian', 'Paranormal', 'Biography & Memoir', 'Self-Help', 'Health & Wellness', 'True Crime', 'History', 'Business & Finance', 'Psychology', 'Philosophy', 'Religion & Spirituality', 'Politics', 'Travel', 'Cookbooks', 'Essays & Journalism'];
import { useSearchParams } from "next/navigation";
import { useSearchGenres } from "@/app/hooks/useSearchGenres";

export default function Genre({ books }: { books: Book[] }) {
    
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""

    const { data: data, isLoading, error } = useSearchGenres(query);



    return (
        <div className="w-fit mx-auto mt-5">
            <h2 className="text-2xl font-bold mt-8 mx-6 text-[#238E8E] ">Genres</h2>
            <div className="flex flex-col lg:flex-row lg:justify-around lg:gap-8 w-full p-4 sm:w-fit">
                <div className={"font-gabarito flex flex-col w-full lg:w-fit"}>
                    <SearchForGenres placeholder="Search..." />
                    <Category category='Fiction' books={books} />
                    <Category category='History' books={books} />
                    <Category category='Family' books={books} />
                </div>
                <div className="w-fit mt-8 lg:mt-0">
                    <h1 className="font-bold border-b-2 border-gray-600 pb-4 mb-4 lg:mb-1">Browse</h1>
                    <div className="grid gap-2 grid-cols-2 lg:grid-cols-3 lg:mt-4 h-fit w-fit mr-auto px-4 mt-8">
                        {bookGenres.map((book: string) => (
                            <Link key={book} href={`./category/${book}`}><p className="text-cyan-400 text-[12px]">{book}</p></Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


function Category({ category, books }: { category: string, books: Book[] }) {
    return (
        <div className="flex flex-col ">
            <h1 className="font-bold my-5 mt-6">{category}</h1>
            <div className="flex flex-wrap justify-start items-center gap-4 max-h-[566px] max-w-[600px] overflow-hidden overflow-y-auto no-scrollbar md:overflow-y-hidden  md:flex-nowrap md:overflow-x-auto  md:mx-5">
                {
                    books.map((book: Book, index: number) => (
                        index <= 7 && <div key={book.name} className=" shadow-md shrink-0 w-[120px] h-[200px] ">
                            <div key={book.name} className="relative group shadow-md fancyorHover"  >
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="w-full h-[184px] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 flex  items-center justify-center flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="w-full flex sm:flex-col gap-3 justify-center items-center mb-6  ">
                                        <Image src="/favorite.png" alt="" width={28} height={28} />
                                        <span className="text-[12px] text-md pt-1  font-bold">{book.reviewsAndRatings?.map((rateValue) => (rateValue.rateValue || 0))} / 5</span>
                                    </span>
                                    <p className="text-[14px] font-bold mb-3">{book.genres?.map((g) => g.name)}</p>
                                    <Link href={`./BookView/${book.id}`} className='rounded-lg'><button className='fancyBorder rounded-lg bg-black text-[12px] text-md py-0.5 px-2 '>View Detail</button></Link>
                                </div>
                            </div>


                        </div>
                    ))
                }
            </div>
            <div className=''>
                <Link href={`./category/${category}`} className=''><p className="ml-auto w-fit text-cyan-600">More...</p></Link>
            </div>
        </div>
    )
}