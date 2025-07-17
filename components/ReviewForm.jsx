"use client";
import React, { useState } from "react";
import { submitReview } from "@/app/actions/actions";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ matchaId, userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setFeedback({ type: "error", message: "Please select a rating." });
      return;
    }
    setIsSubmitting(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("matcha_id", matchaId);
    formData.append("user_id", userId);
    formData.append("rating", rating);
    formData.append("comment", comment);

    const result = await submitReview(formData);
    setIsSubmitting(false);

    if (result?.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setRating(0);
      setComment("");
      setFeedback({
        type: "success",
        message: "Review submitted successfully!",
      });
      // Optionally, you can still reload the page or re-fetch reviews
      // window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-lg">
      <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
      {feedback && (
        <div
          className={`p-4 mb-4 rounded-lg ${feedback.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {feedback.message}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Rating</label>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <label key={starValue} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <FaStar
                  size={30}
                  color={starValue <= (hover || rating) ? "#658c5e" : "#e4e5e9"}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-lg font-medium mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows="4"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-matcha text-white font-bold py-2 px-4 rounded-lg hover:bg-matcha-dark disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
