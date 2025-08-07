const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book storage
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 7, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 9, title: "Moby-Dick", author: "Herman Melville" },
  { id: 10, title: "The Book Thief", author: "Markus Zusak" }
];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Title and author are required' });

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', (req, res) => {
  const { title, author } = req.body;
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📘 Book API running at http://localhost:${PORT}`);
});
