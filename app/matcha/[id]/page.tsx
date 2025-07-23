import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ReviewsList from "@/components/ReviewsList"; // Import the new component

const MatchaProductPage = async ({ params }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return <div className="p-6 text-red-600">Product ID not found.</div>;
  }

  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from("matcha_products")
    .select(
      "id, name, brand, origin, grade, image_url, description, price, notes",
    )
    .eq("id", id)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (productError) {
    console.error("Error fetching matcha product:", productError);
    return <div className="p-6 text-red-600">Failed to fetch product.</div>;
  }

  if (!product) {
    return <div className="p-6 text-gray-500">Product not found.</div>;
  }

  function getNoteColor(note) {
    const colors = {
      umami: "#e6dacd",
      nutty: "#9e7e4f",
      grassy: "#779c46",
      creamy: "#f1ebe1",
      vegetal: "#44624a",
      sweet: "#f4cccc",
      bitter: "#ac9b80",
      floral: "#d9d2e9",
      default: "#ccc",
    };
    return colors[note.toLowerCase()] || colors.default;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg  overflow-hidden">
        <div className="md:flex">
          {product.image_url && (
            <div className="md:flex-shrink-0">
              <Image
                src={product.image_url}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-64 object-cover md:w-64"
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 mb-2">{product.brand}</p>
            <p className="text-lg text-gray-600 mb-1">
              Origin: {product.origin}
            </p>
            <p className="text-lg text-gray-600 mb-1">Grade: {product.grade}</p>
            <p className="text-matcha font-semibold leading-relaxed">
              &quot;{product.description}&quot;
            </p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Main Notes
              </h2>
              <div className="space-y-1">
                {product.notes.map((note, i) => (
                  <div key={i} className="relative h-6 rounded">
                    <div
                      className="absolute inset-0 rounded"
                      style={{
                        width: `${100 - i * 10}%`,
                        backgroundColor: getNoteColor(note),
                      }}
                    />
                    <span className="relative z-10 pl-2 text-sm text-black font-medium leading-6">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
          <ReviewsList matchaId={id} />
        </div>
        <div className="">
          <Link href={`/matcha/${id}/review`} className="text-shadow-matcha font-semibold ">your thoughts?</Link>
        </div>
      </div>
    </div>
  );
};

export default MatchaProductPage;
