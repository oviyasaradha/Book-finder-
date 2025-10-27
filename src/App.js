
 import React, { useState } from "react";
import './App.css';

function App() {
  const [query, setQuery] = useState(""); // for user input
  const [books, setBooks] = useState([]); // to store book list
  const [loading, setLoading] = useState(false); // to show loading text
  const [error, setError] = useState(""); // to show error message

  // function to fetch book data
  const searchBooks = async () => {
    if (query.trim() === "") {
      setError("Please enter a book name!");
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        setBooks(data.docs.slice(0, 20)); // show only first 10 results
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>📚 Book Finder App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

    
    
  
