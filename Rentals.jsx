import React, { useState, useEffect } from "react";
import axios from "axios";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileKey, setFileKey] = useState(Date.now());

  // ✅ Fetch Rentals from Backend
  const fetchRentals = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/rentals");
      setRentals(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Unable to load rentals. Check the backend server.");
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // ✅ Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please choose an image before uploading.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await axios.post("http://127.0.0.1:5000/api/rentals", formData);

      setMessage("Listing posted successfully!");

      // ✅ Reset form
      setTitle("");
      setPrice("");
      setImage(null);
      setFileKey(Date.now());

      // ✅ Refresh list
      fetchRentals();
    } catch (err) {
      console.error("Upload error:", err);
      console.error("Upload error response:", err.response);
      setMessage(
        err.response?.data?.message || err.message || "Upload failed. Check the backend server."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* 🔹 Upload Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Post a New Rental
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Price (e.g. $1,000/mo)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            key={fileKey}
            type="file"
            className="w-full"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload Listing"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
          )}
        </form>
      </div>

      {/* 🔹 Rentals List */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Available Rentals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentals.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No rentals available
          </p>
        ) : (
          rentals.map((rental) => (
            
            <div
              key={rental._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
            >
              <img
                src={rental.image?.url || rental.image}
                alt={rental.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {rental.title}
                </h3>

                <p className="text-blue-600 font-bold">
                  {rental.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rentals;