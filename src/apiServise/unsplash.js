import { toast } from "react-hot-toast";

const ACCESS_KEY = "NIJSZrLdbBmUcArxqkRYktVk64R9zrsY5OXbTn14sWQ";
const BASE_URL = "https://api.unsplash.com";

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return {
      results: data.results,
      totalPages: data.total_pages,
    };
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}
