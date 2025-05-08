import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../apiServise/unsplash";
import toast, { Toaster } from "react-hot-toast";

import ImageModal from "../components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("idle");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const handleSearch = async (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setStatus("loading");
    setPage(1);
    setImages([]);
    try {
      const { results, totalPages } = await fetchImages(newQuery, 1);
      if (results.length === 0) {
        toast.error(`No images found for "${newQuery}"`);
      }
      setImages(results);
      setTotalPages(totalPages);
      setStatus("resolved");
    } catch {
      setStatus("error");
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setStatus("loading");
    try {
      const { results } = await fetchImages(query, nextPage);
      setImages((prev) => [...prev, ...results]);
      setPage(nextPage);
      setStatus("resolved");
    } catch {
      setStatus("error");
    }
  };
  const openModal = (regularUrl, alt) => {
    setModalIsOpen(true);
    setModalSrc(regularUrl);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc("");
    setModalAlt("");
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        containerStyle={{
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      {status === "error" && <ErrorMessage message="Failed to load images." />}
      <ImageGallery images={images} openModal={openModal} />
      {status === "loading" && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </div>
  );
}
export default App;
