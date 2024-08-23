import React, { useState, useMemo, useCallback } from "react";

function FilterComponent({ books, onFilter }) {
  const [filterType, setFilterType] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const authors = useMemo(
    () => [...new Set(books.map((book) => book.author))],
    [books]
  );
  const categories = useMemo(
    () => [...new Set(books.map((book) => book.category))],
    [books]
  );

  const handleFilterTypeChange = useCallback((e) => {
    setFilterType(e.target.value);
    setSelectedValue("");
  }, []);

  const handleValueChange = useCallback(
    (e) => {
      setSelectedValue(e.target.value);
      onFilter({ [filterType]: e.target.value });
    },
    [filterType, onFilter]
  );

  const handleReset = useCallback(() => {
    setFilterType("");
    setSelectedValue("");
    onFilter({});
  }, [onFilter]);

  return (
    <div className="mb-4 flex justify-start items-center gap-4">
      <div>
        <label className="mr-2">اختر نوع الفلتر : </label>
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="px-4 border rounded"
        >
          <option value="">اختر نوع الفلتر</option>
          <option value="author">المؤلف</option>
          <option value="category">الفئة</option>
        </select>
      </div>

      <div>
        <label className="mr-2">
          {filterType === "author" ? "اختر المؤلف : " : "اختر الفئة : "}
        </label>
        <select
          value={selectedValue}
          onChange={handleValueChange}
          className="px-4 border rounded"
          disabled={!filterType}
        >
          <option value="">
            اختر {filterType === "author" ? "المؤلف" : "الفئة"}
          </option>
          {filterType === "author" &&
            authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          {filterType === "category" &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={handleReset}
        className="p-2 bg-blue-700 text-white rounded"
      >
        إلغاء الفلترة
      </button>
    </div>
  );
}

export default React.memo(FilterComponent);
