import { useQuery } from '@tanstack/react-query';
import { genreDetails } from '../lib/definition';

export const useSearchGenres = (genreName: string) => {
    return useQuery<genreDetails>({
        queryKey: ['genres', 'search', genreName],
        enabled: !!genreName,
        queryFn:async ()=>{
      
            if (!genreName) return [];

            const res = await fetch(`http://localhost:3000/api/genres/search?genreName=${encodeURIComponent(genreName)}`, {
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