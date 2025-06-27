
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function MatchaPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('matcha_products')
    .select('id, name, brand, origin, grade, image_url, description, price');

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to fetch matcha products: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        No matcha products found.
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Matcha</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/matcha/${product.id}`} key={product.id}>
          <div key={product.id} className="rounded-xl border p-4 shadow hover:shadow-md transition">
            {product.image_url && (
              <div className="flex items-start mb-4 m-3">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-md font-semibold text-gray-600">{product.brand}</p>
                  <p className="text-sm text-semibold text-gray-500">Origin: {product.origin}</p>
                  <p className="text-sm text-bold text-black">${product.price}</p>
                  <p className="text-sm mt-6 text-green-700 font-semibold">&quot;{product.description}&quot;</p>
                </div>
                {product.image_url && (
                  <div className="relative h-48 w-48 flex-shrink-0">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
