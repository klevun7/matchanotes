"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MatchaSearch from "@/components/matchaSearch";
import { showTopMatcha } from "@/app/actions/actions";
import Link from "next/link";
import matcha from "@/public/matcha2.webp";
import whisk from "@/public/whisk.png";
import Divider from "@/components/Divider";

export default function Home() {
  const [topMatchaProducts, setTopMatchaProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getNoteColor(note) {
    const colors = {
      umami: "#756746",
      nutty: "#9e7e4f",
      grassy: "#779c46",
      creamy: "#e0dfa8",
      vegetal: "#44624a",
      sweet: "#ad80a9",
      bitter: "#ac9b80",
      floral: "#caa6f7",
      default: "#ccc",
      rich: "#d4b483",
      sweet: "#f4cccc",
      astringent: "#6e6d57",
      earthy: "#c9c9c9",
      default: "#779c46",
    };
    return colors[note.toLowerCase()] || colors.default;
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await showTopMatcha();
        setTopMatchaProducts(products);
      } catch (err) {
        console.error(
          "Error fetching top matcha products for landing page:",
          err
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
      <section className="flex flex-row items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src={matcha}
            alt="Matcha Bowl"
            className="w-48 h-48 object-contain mb-6"
            width={200}
            height={200}
            priority
          />
          <h1 className="text-4xl font-bold text-matcha mb-4">
            discover the world of matcha!
          </h1>
          <MatchaSearch />
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold text-matcha mb-6 underline">
          top matcha picks
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-matcha-light origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </h2>

        {loading && (
          <p className="text-center text-matcha animate-pulse">
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
                className="flex flex-col items-center bg-white rounded-lg border-2 border-cream shadow p-4 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
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
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.notes.map((note, index) => (
                      <div
                        key={index}
                        className="text-xs font-semibold px-2 py-0.5 border-2 rounded-full"
                        style={{
                          borderColor: getNoteColor(note),
                          color: getNoteColor(note),
                        }}
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
        </div>
      </section>
      <Divider imageSrc="/whisk.png" altText="Matcha Divider" />
    </main>
  );
}
