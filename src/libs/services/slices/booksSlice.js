import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  const response = await fetch(`${API_URL}/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

// دالة جديدة لجلب معلومات كتاب معين
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    });

    // التعامل مع حالة نجاح fetchBookById
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    });
  },
});

export default booksSlice.reducer;
