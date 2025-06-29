import Image from "next/image";
import  MatchaSearch  from '@/components/matchaSearch'
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
        <h1 className="text-4xl font-bold text-matcha mb-4">
          Discover the World of Matcha
        </h1>
        <MatchaSearch />
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
    </main>
  );
}
