



export async function addToShelf(bookId: string) {
  const res = await fetch("http://localhost:3000/api/profiles/add-to-Shelf", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookId }),
  });

  const data = await res.json();
}

export async function rateBook(rateNum: number, bookId: string) {
  const res = await fetch(`http://localhost:3000/api/ratings/books/${bookId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rateValue: rateNum }),
  });

  const data = await res.json();
}