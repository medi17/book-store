import { useSearchBooks } from '@/app/hooks/useSearchBooks';
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from 'lucide-react';
import { fetchBook } from '../lib/definition'
import NotFoundBook from './notFoundBook';

export default function SearchResults({ books }: { books: fetchBook[] }) {
    console.log("searched booL:", books);
  
    const hasBooks = books && books.length > 0;
  
    return (
      <div className="flex flex-wrap justify-center overflow-hidden overflow-x-auto no-scrollbar p-5 mt-16">
        <div className="flex flex-wrap  min-w-full justify-start gap-5 sm:p-5">
          {hasBooks ? (
            books.map((book: fetchBook) => (
              <div
                key={book.id}
                className="shadow-md shrink-0 w-[120px] h-[248px] sm:w-[160px] sm:h-[300px] md:w-[220px] md:h-[400px]"
              >
                <div className="relative group shadow-md fancyBorderForHover">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-[184px] sm:h-[234px] md:h-[350px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-full flex sm:flex-col gap-3 justify-center items-center mb-6 sm:mb-10">
                      <img
                        src="../../favorite.png"
                        alt=""
                        className="w-7 h-7 sm:w-10 sm:h-10"
                      />
                      <span className="text-[12px] sm:text-md font-bold">
                        {book.rating} / 5
                      </span>
                    </span>
                    <p className="text-[14px] sm:text-lg font-bold mb-3">
                      {book.category}
                    </p>
                    <Link
                      href={`/pages/BookView/${book.id}`}
                      className="fancyBorder rounded-lg bg-black text-[12px] sm:text-md p-0.5 pl-2 sm:py-2 sm:px-10"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
  
                <h3 className="text-md font-bold">{book.name}</h3>
                <p className="text-[13px] text-grey-300">
                  by{" "}
                  <span className="font-handlee text-[#238E8E]">
                    {book.authors[0].name}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <NotFoundBook/>
            )}
         </div>
      </div>
    );
  }