import { useQuery } from '@tanstack/react-query';
import { fullGenreRespnse } from '../lib/definition';

export const getGenre = (id: string) => {
    return useQuery<fullGenreRespnse>({
        queryKey: ['genre', id],
        enabled: !!id,
        queryFn:async ()=>{
      
            if (!id) return [];

            const res = await fetch(`http://localhost:3000/api/genres/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch genre');
            }

            return res.json(); 
        },
    })
}

