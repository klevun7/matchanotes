import Image from 'next/image';
import React from 'react';
import whisk from '../public/whisk.png'; 


// Define the types for the component's props
interface DividerProps {
  imageSrc: string;
  altText: string;
}

const Divider: React.FC<DividerProps> = ({ imageSrc, altText }) => {
  return (
    <div className="flex items-center justify-center my-8">
    
    <div className="flex items-center w-4xl my-8">
     
      {/* Left Dashed Line */}
      <div className="flex-grow border-t-2 border-matcha border-dashed rounded-full"></div>
      
      {/* Image in the middle */}
      <div className="px-4">
        <Image
          src={whisk}
          alt={altText}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      
      {/* Right Dashed Line */}
      <div className="flex-grow border-t-2 border-matcha border-dashed rounded-full"></div>
    </div>
    </div>
  );
};

export default Divider;