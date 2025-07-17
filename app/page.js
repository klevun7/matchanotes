"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MatchaSearch from "@/components/matchaSearch";
import { showTopMatcha } from "@/app/actions/actions";
import Link from "next/link";
import dynamic from "next/dynamic";
import matcha from "@/public/matcha2.webp";
import ReviewForm from "@/components/ReviewForm";

export default function Home() {
  const [topMatchaProducts, setTopMatchaProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await showTopMatcha();
        setTopMatchaProducts(products);
      } catch (err) {
        console.error(
          "Error fetching top matcha products for landing page:",
          err,
        );
        setError("Failed to load top matcha products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-8 ">
        <Image
          src={matcha}
          alt="Matcha Bowl"
          className="w-48 h-48  object-cover mb-6"
          width={200}
          height={200}
          priority
        />
        <h1 className="text-4xl font-bold text-matcha mb-4">
          discover the world of matcha
        </h1>
        <MatchaSearch />
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold text-matcha mb-6">
          top matcha picks
        </h2>

        {loading && (
          <p className="text-center text-gray-700">
            Loading top matcha products...
          </p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && topMatchaProducts.length === 0 && (
          <p className="text-center text-gray-700">
            No top matcha products found at the moment.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {!loading &&
            !error &&
            topMatchaProducts.map((product) => (
              <Link
                key={product.id}
                href={`/matcha/${product.id}`}
                className="flex flex-col items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <Image
                  src={product.image_url || "/ippodo1.webp"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-24 h-24 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-green-800 text-center">
                  {product.name}
                </h3>
                <p className="text-md text-gray-700">{product.brand}</p>
                {product.notes && product.notes.length > 0 && (
                  <div className="text-sm text-matcha font-semibold mt-1">
                    {product.notes.join(", ")}
                  </div>
                )}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
