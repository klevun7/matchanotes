"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MatchaSearch from "@/components/matchaSearch";
import { showTopMatcha } from "@/app/actions/actions";
import Link from "next/link";
import matcha from "@/public/matcha2.webp";
import whisk from "@/public/whisk.png";
import Divider from "@/components/Divider";
import MatchaTips from "@/components/MatchaTips";

export default function Home() {
  const [topMatchaProducts, setTopMatchaProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getNoteColor(note) {
    const colors = {
      umami: "#c9786d",
      nutty: "#9e7e4f",
      grassy: "#2d572c",
      creamy: "#b0ac82",
      vegetal: "#44624a",
      bitter: "#ac9b80",
      floral: "#caa6f7",
      rich: "#d4b483",
      sweet: "#b680ba",
      astringent: "#6e6d57",
      earthy: "#635d49",
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
      <section className="flex flex-row items-center justify-center p-6 max-w-screen">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#658c5e"
          fillOpacity="1"
          d="M0,0L26.7,42.7C53.3,85,107,171,160,224C213.3,277,267,299,320,266.7C373.3,235,427,149,480,133.3C533.3,117,587,171,640,181.3C693.3,192,747,160,800,122.7C853.3,85,907,43,960,42.7C1013.3,43,1067,85,1120,112C1173.3,139,1227,149,1280,144C1333.3,139,1387,117,1413,106.7L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>

      <section className="p-8">
        <h2 className="text-2xl font-bold text-matcha mb-6">
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
                className="flex flex-col items-center bg-white rounded-3xl border-2 border-matcha-light shadow p-4 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <Image
                  src={product.image_url || "/ippodo1.webp"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-24 h-24 object-cover mb-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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
      <MatchaTips />
    </main>
  );
}
