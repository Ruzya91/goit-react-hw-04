import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

function ImageGallery({ images, openModal }) {
  if (!images.length) return null;
  return (
    <ul className={styles.gallery}>
      {images.map((img) => (
        <li key={img.id} className={styles.item}>
          <ImageCard
            src={img.urls.small}
            alt={img.alt_description}
            onClick={() => openModal(img.urls.regular, img.alt_description)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
