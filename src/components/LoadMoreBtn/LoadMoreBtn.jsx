import React from "react";
import styles from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick, disabled }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
}

export default LoadMoreBtn;
