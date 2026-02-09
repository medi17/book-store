import { useQuery } from '@tanstack/react-query';

export const useSearchGenres = (query: string) => {
    return useQuery({
        queryKey: ['genres', 'search', query],
        queryFn:async ()=>{
      
            if (!query) return [];

            const res = await fetch(`http://localhost:3000/api/genres/search?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch genres');
            }

            return res.json(); 
        },
    })
}