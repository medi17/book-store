"use client"
import Image from 'next/image'
import { TrashIcon, EyeIcon, StarIcon, UserIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {fetchBooks} from "@/app/lib/fetching-data"
import { fullbooksResponse } from '@/app/lib/definition';

export default function Page() {
  const queryClient = useQueryClient()

  const { data: res, isLoading, error } = useQuery<fullbooksResponse, Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const books = res?.data ?? [];

  const deleteBookMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete book');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
  
  function handleBookDelete(id: string) {
    deleteBookMutation.mutate(id);
  }

  return (
  <div className=" h-full">
    <table className="table-auto text-lg text-gray-300  w-full">
      <thead>
        <tr className="bg-black-100 ">
          <th className=" px-4 py-2 ">Title</th>
          <th className=" px-4 py-2">Author</th>
          <th className=" px-4 py-2">Genre</th>
          <th className=" px-4 py-2">Status</th>
          <th className=" px-4 py-2">Rating</th>
          <th className=" px-4 py-6">Actions</th>
        </tr>
      </thead>
      
      <tbody >
        {
          books.map((book)=>(
            
            <tr key={book.id} className='text-sm text-gray-400'>
              <td className="px-4 py-2 text-center">
                <p className="">{book.name}</p>
              </td>
              <td className=" px-4 py-2 text-center ">
                <p className="flex flex-wrap justify-center gap-1">
                  {book.authors.map((a, i) => <span key={i}>{a.name}{i < book.authors.length - 1 ? "," : ""}</span>)}</p>
              </td>
              <td className="px-4 py-2  text-center">
                <p className="flex flex-wrap justify-center gap-1">
                  {book.genres.map((g, i) => <span key={i} className='' >{g.name}{i < book.genres.length - 1 ? "," : ""}</span>)}
                </p>
              </td>
              <td className=" px-4 py-2 text-center">
                <p className="|">{book.status.name}</p>
              </td>
              <td className="px-4 py-2 ">
                <div className="flex whitespace-nowrap gap-2 justify-center ">
                    <StarIcon className='w-5 h-5 text-cyan-600' />
                    <p className="text-[16px]">{book.averageRating}</p>
                </div>
              </td>
              <td className="px-4 py-2 ">
                <div className="flex gap-2 h-full my-auto justify-center items-center">
                    <PencilIcon className='w-5 h-5' />
                    <TrashIcon className='w-5 h-5' onClick={()=>handleBookDelete(book.id)} />
                    <EyeIcon className='w-5 h-5' />
                </div>
              </td>
              
           </tr>
          ))
        }
      </tbody>
    </table>
    </div>
)}