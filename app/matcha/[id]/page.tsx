import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

const MatchaProductPage = async ({ params }) => {
  const { id } = await params;

  if (!id) {
    return (
      <div className="p-6 text-red-600">
        Product ID not provided in the URL.
      </div>
    );
  }

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("matcha_products")
    .select(
      "id, name, brand, origin, grade, image_url, description, price, notes"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching matcha product:", error);
    return (
      <div className="p-6 text-red-600">
        Failed to fetch matcha product: {error.message}
      </div>
    );
  }

  if (!product) {
    return <div className="p-6 text-gray-500">Product not found.</div>;
  }

  function getNoteColor(note: string): string {
    const colors: Record<string, string> = {
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:flex">
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
          <p className="text-lg text-gray-600 mb-1">Origin: {product.origin}</p>
          <p className="text-lg text-gray-600 mb-1">Grade: {product.grade}</p>
          <p className="text-2xl text-sage font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-matcha font-semibold leading-relaxed">&quot;{product.description}&quot;</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Main Notes
            </h2>
            <div className="space-y-1">
              {product.notes.map((note: string, i: number) => (
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
        <div>
        </div>
      </div>
    </div>
  );
};

export default MatchaProductPage;
