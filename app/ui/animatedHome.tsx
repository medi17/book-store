"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroText from "@/app/ui/introText";
import Search from "@/app/ui/search";
import { partialBookSchema, generalSearchResults } from "../lib/definition";
import RecentlyPublishedBooks from "./recentlypub-books";
import BookoftheMonth from "./BOTM"
import BookCard from "./bookCard";
import NotFoundBook from "./notFoundBook";

type searchProps = {
  isLoading: boolean,
  q: string,
  data: generalSearchResults
}

export default function AnimatedHome({ isLoading, q, data }: searchProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const books = data?.data ?? [];

  return (
    <div className="relative min-h-screen bg-black text-white">

      <AnimatePresence>
        {!searchOpen && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <IntroText />

          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 120 }}
        className={`${searchOpen ? "mt-10" : "mt-15"
          }`}
      >
        <Search setSearchOpen={setSearchOpen} placeholder="Search..." isLoading={isLoading} />

      </motion.div>

      <AnimatePresence>
        {!searchOpen && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <RecentlyPublishedBooks />
            <BookoftheMonth />
          </motion.div>)}

      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 px-10"
          >
            {
              q ? (
                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
                  {books.map((book: partialBookSchema) => (
                      <BookCard book={book} key={book.id} />
                    )
                  )}
                </div>
              ) : (
                <NotFoundBook />
              )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}