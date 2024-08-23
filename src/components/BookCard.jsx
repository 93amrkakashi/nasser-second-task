import { Link, useLocation } from "react-router-dom";
import { deleteBook } from "../libs/services/slices/booksSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BookCard({ book }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";
  const handleDelete = (id, title) => {
    const confirmDelete = window.confirm(`هل تريد حقًا حذف كتاب  "${title}"؟`);
    if (confirmDelete) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div key={book?.id} className="border rounded-lg shadow bg-white text-text">
      <div className="h-48 w-full bg-gray-300 text-center flex items-center justify-center">
        <img
          src="../assits/images/books.gif"
          width={150}
          height={150}
          alt="book"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl text-center font-semibold mb-2 text-gray-900">
          {book?.title}
        </h2>
        <div className="w-full px-2 flex justify-between items-center">
          <p className="text-sm text-gray-700 mb-1">{book?.author}</p>
          <p className="text-sm text-gray-700">{book?.category}</p>
        </div>
      </div>
      {user && user.role === "admin" && isAdminPage && (
        <div className="w-full flex justify-around items-center p-2">
          <Link
            to={`/admin/edit/${book?.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            تعديل
          </Link>
          <button
            onClick={() => handleDelete(book?.id, book?.title)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            حذف
          </button>
        </div>
      )}
    </div>
  );
}