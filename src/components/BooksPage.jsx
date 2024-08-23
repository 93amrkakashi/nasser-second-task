import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import BookCard from "./BookCard";
import { fetchBooks } from "../libs/services/slices/booksSlice";

export default function BooksPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchBooks());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const filteredBooks = useMemo(() => {
    return books?.filter((book) => {
      let matches = true;
      if (filter.author) {
        matches = matches && book.author === filter.author;
      }
      if (filter.category) {
        matches = matches && book.category === filter.category;
      }
      return matches;
    });
  }, [books, filter]);

  const handleFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);

  return (
    <div className="w-full p-4">
      <FilterComponent books={books} onFilter={handleFilter} />
      {loading ? (
        <div className="text-center">يتم تحميل الكتب...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} isAdminPage={isAdminPage} />
          ))}
        </div>
      )}
      {isAdminPage && (
        <Link
          to={"/admin/new"}
          className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-lg p-2 px-4"
        >
          اضافة كتاب
        </Link>
      )}
    </div>
  );
}
