import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-8 bg-green-50">
        <Image
          src="/ippodo1.webp" 
          alt="Matcha Bowl"
          className="w-48 h-48 rounded-full object-cover mb-6"
          width = {200}
          height={200}
        />
        <h1 className="text-4xl font-bold text-green-900 mb-4">
          Discover the World of Matcha
        </h1>
        <div className="flex items-center space-x-2 bg-white rounded-full shadow-md px-4 py-2">
          <input
            type="text"
            placeholder="Search for matcha"
            className="outline-none w-64 text-gray-700"
          />
          <button className="text-green-700">
            ➔
          </button>
        </div>
      </section>

      {/* Trending Matcha Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Trending Matcha</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Ceremonial Grade', 'Uji Matcha', 'Organic Matcha', 'Matcha Latte Mix'].map((item) => (
            <div key={item} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
              <Image 
              src="/ippodo1.webp" 
              alt={item}
              width={200}
              height={200}
              className="w-24 h-24 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-green-800">{item}</h3>
              <div className="flex items-center mt-2">
                {'★★★★★'}
              </div>
              <p className="text-sm text-gray-600">4.8 reviews</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Brands Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Top Rated Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Matcha House', 'Encha', 'Ippodo', 'Naoki'].map((brand) => (
            <div key={brand} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
              <Image 
              src="/ippodo1.webp" 
              alt={brand}
              width = {200}
              height={200} 
              className="w-24 h-24 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-green-800">{brand}</h3>
              <div className="flex items-center mt-2">
                {'★★★★★'}
              </div>
              <p className="text-sm text-gray-600">Excellent</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rate & Review Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Rate & Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Review Card 1 */}
          <div className="flex items-center bg-white rounded-lg shadow p-4 space-x-4">
            <Image 
            src="/ippodo1.webp"
            width={200}
            height={200} 
            alt="Matcha House" 
            className="w-16 h-16 object-cover rounded-full" />
            <div>
              <h3 className="font-semibold text-green-800">5.0 stars - Matcha House</h3>
              <p className="text-gray-600 text-sm">Excellent matcha with a rich, smooth flavor.</p>
            </div>
          </div>
          {/* Review Card 2 */}
          <div className="flex items-center bg-white rounded-lg shadow p-4 space-x-4">
            <Image 
            src="/ippodo1.webp"
            width={200}
            height={200} 
            alt="Spicy" 
            className="w-16 h-16 object-cover rounded-full" />
            <div>
              <h3 className="font-semibold text-green-800">Spicy</h3>
              <p className="text-gray-600 text-sm">Very smooth, extended with a rich, smooth flavor.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
