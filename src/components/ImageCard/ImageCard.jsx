import React from "react";
import styles from "./ImageCard.module.css";

function ImageCard({ src, alt, onClick }) {
  return (
    <div className={styles.card}>
      <img src={src} alt={alt} className={styles.image} onClick={onClick} />
    </div>
  );
}

export default ImageCard;
