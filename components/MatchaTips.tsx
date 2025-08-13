// components/AboutSection.tsx
import Image from "next/image";

const MatchaTips = () => {
  return (
    <div
      id="about"
      className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-10 p-8 lg:p-12"
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Image
          src="/matcha-bowl.png"
          alt="Profile"
          width={400}
          height={400}
          className="rounded-full"
        />
      </div>

      <div className="w-full lg:w-1/2 text-center h-full lg:text-left bg-matcha lg:p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl text-cream font-bold font-satoshi mb-4">
          Matcha Tips
        </h1>
        <ol>
          <li className="text-cream">
            <p className="text-lg mb-2">
              1. Use high-quality matcha for the best flavor and health
              benefits.
            </p>
            <p className="text-lg mb-2">
              2. Store matcha in a cool, dark place to maintain its freshness.
            </p>
            <p className="text-lg mb-2">
              3. Use filtered water at the right temperature (around 175°F) to
              brew matcha.
            </p>
            <p className="text-lg mb-2">
              4. Sift matcha before whisking to avoid clumps and ensure a smooth
              texture.
            </p>
            <p className="text-lg mb-2">
              5. Use a bamboo whisk (chasen) for the best froth and consistency.
            </p>
            <p className="text-lg mb-2">
              6. Milk matters! Choose the right milk (dairy or plant-based) to
              complement your matcha. Dairy for a creamy texture, oat milk for a
              balanced flavor, or almond milk for a nutty twist.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default MatchaTips;
