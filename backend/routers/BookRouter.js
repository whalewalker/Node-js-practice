import express from 'express';
import { Book } from '../models/Book.js';
import { createResponse } from '../models/Response.js';

const router = express.Router();

// API to save book
router.post("", async (req, res) => {
    try {
      const { title, author, publishYear } = req.body;
      if (!title || !author || !publishYear) {
        return res
          .status(400)
          .send(
            createResponse(
              null,
              0,
              "Send all required fields: title, author, publishYear"
            )
          );
      }
  
      const book = {
        title,
        author,
        publishYear,
      };
  
      const savedBook = await Book.create(book);
      return res.status(200).json(createResponse(savedBook));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(createResponse(null, 0, err.message));
    }
  });
  
  // API to get all books
  router.get("", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json(createResponse(books));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(createResponse(null, 0, err.message));
    }
  });
  
  //API to get book by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
  
      if (!book) {
        return res
          .status(404)
          .json(createResponse(null, 0, "Book not found by ID"));
      }
  
      return res.status(200).json(createResponse(book));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(createResponse(null, 0, err.message));
    }
  });
  
  //API to update book by id
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, publishYear } = req.body;
  
      const book = await Book.findById(id);
      if (!book) {
        return res
          .status(404)
          .json(createResponse(null, 0, "Book not found by ID"));
      }
  
      if (title) {
        book.title = title;
      }
      if (author) {
        book.author = author;
      }
      if (publishYear) {
        book.publishYear = publishYear;
      }
  
      const updatedBook = await book.save();
      return res.status(200).json(createResponse(updatedBook));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(createResponse(null, 0, err.message));
    }
  });
  
  //API to delete book by id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Book.findByIdAndDelete({ _id: id });
      if (!result) {
        return res
          .status(404)
          .json(createResponse(null, 0, "Book not found by ID"));
      }
      return res.status(200).json(createResponse());
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(createResponse(null, 0, err.message));
    }
  });

  export default router;
  