"use client";

import Link from "next/link";

const MatchaCard = ({ id, name, brand, origin, grade, imageUrl }) => {
  return (
    <Link
      href={`/matcha/${id}`}
      className="block rounded-xl shadow hover:shadow-lg overflow-hidden transition"
    >
      <div className="relative w-full h-60 bg-gray-100">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-forest">{name}</h2>
        <p className="text-sm text-gray-600">
          {brand} — {origin}
        </p>
        {grade && <p className="text-sm text-gray-500">Grade: {grade}</p>}
      </div>
    </Link>
  );
};

export default MatchaCard;
