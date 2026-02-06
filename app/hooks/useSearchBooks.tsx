// hooks/useSearchBooks.ts
import { useQuery } from '@tanstack/react-query';

export const useSearchBooks = (query: string) => {
  return useQuery({
    queryKey: ['books', 'search', query],
    queryFn: async () => {
      if (!query) return [];

      const res = await fetch(`http://localhost:3000/api/books/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
       
       console.log("searched book:")
      return res.json(); // parse JSON response
    },
    enabled: !!query, // only run when query is not empty
  });
};
