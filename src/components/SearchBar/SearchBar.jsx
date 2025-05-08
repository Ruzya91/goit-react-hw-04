import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return toast.error("Enter search term");
    onSubmit(trimmed);
    setValue("");
  };
  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
