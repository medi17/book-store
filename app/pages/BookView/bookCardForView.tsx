"use client";
import { useShelfStore } from "@/store/shelfStore";
import { bookDetailSchema } from "@/app/lib/definition";

export default function BookCardForView({ book }: { book: bookDetailSchema }) {
  const addToShelf = useShelfStore((state) => state.addToShelf);
  return (
    <button
      className="fancyBorder w-full mb-4 py-1"
      onClick={() => addToShelf(book)}
    >
      Add to shelf
    </button>
  );
}
