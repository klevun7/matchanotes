import React from "react";
import { createClient } from "@/lib/supabase/server";
import { FaStar } from "react-icons/fa";

const ReviewsList = async ({ matchaId }) => {
  const supabase = await createClient();

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*, users(email)") 
    .eq("matcha_id", matchaId)
    .order("created_at", { ascending: false });

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
    return <p className="text-red-500">Could not load reviews.</p>;
  }

  return (
    <div className="mt-6 space-y-6">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              {/* Access review.profiles.email directly */}
              <p className="font-semibold text-lg mr-4">
                {review.profiles ? review.profiles.email : "Anonymous"}{" "}
                {/* Use 'email' here */}
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? "#658c5e" : "#e4e5e9"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
