
import {Book} from './definition';
import { Genre } from './definition';
import { includes } from 'zod';



export async function fetchBooks() {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    
  console.log('am i trying to fetch the book detail')
  
  const res = await fetch('http://localhost:3000/api/books', {
    method: "GET", // always get fresh data
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch books", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data; 
}

const book = await fetchBooks()
const topRatedbook = await fetchBooks()

export const books = book
export const topRatedbooks = topRatedbook

//fetch book detail

export async function fetchBookDetail({bookId}: { bookId: string } ) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the BookDetail')
  
  const res = await fetch(`http://localhost:3000/api/books/${bookId}`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch books", res.status, res.statusText);
    return [];
  }

  const data = await  res.json();
  console.log("bookDetail:", data)
  return data;
 
}

export async function fetchAllGenres( ) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the genres')
  
  const res = await fetch(`http://localhost:3000/api/genres/all-genres`, {
    method: "GET",
    credentials: "include"
    
  });

  if (!res.ok) {
    console.error("Failed to fetch genres", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data.genres;
 
}
export async function fetchReview({bookID}:{bookID: string}) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the reviews')
  
  const res = await fetch(`http://localhost:3000/api/reviews/books/${bookID}`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch reviews", res.status, res.statusText);
    return [];
  }

  const data = await res.json();

  return data;
 
}

export async function fetchAllReviews() {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the reviews')
  
  const res = await fetch(`http://localhost:3000/api/reviews`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch reviews", res.status, res.statusText);
    return [];
  }

  const data = await res.json();

  return data;
 
}

export async function addtoShelf(bookId: string) {
  const res = await fetch("http://localhost:3000/api/profiles/add-to-Shelf", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookId }),
  });

  const data = await res.json();
  console.log(data); // { message: "Book added to shelf successfully" }
}

export async function fetchShelfBooks( ) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the genres')
  
  const res = await fetch(`http://localhost:3000/api/profiles/get-shelf`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch genres", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data.genres;
 
}

export async function fetchDashboardCounts( ) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the genres')
  
  const res = await fetch(`http://localhost:3000/api/profiles/count`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch counts", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data;
 
}
export async function fetchAllUsers( ) {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log('am i trying to fetch the genres')
  
  const res = await fetch(`http://localhost:3000/api/profiles/all-users`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Failed to fetch counts", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return data;
}