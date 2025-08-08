import React from "react";
import Image from "next/image";
import whisk from "@/public/whisk.png";





const ProfilePage = () => {
    return (
        <div className="max-w-2xl mx-auto mt-12 p-10 border border-gray-100 rounded-2xl bg-white shadow-xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-matcha mb-4">Profile</h1>
    
        <div className="flex items-center justify-center mb-6">
            <Image
            src={whisk}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
            />
        </div>
    
        <div>
            <label htmlFor="username" className="font-semibold text-gray-700 block mb-2">
            Username
            </label>
            <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
            />
        </div>
    
        <div>
            <label htmlFor="email" className="font-semibold text-gray-700 block mb-2">
            Email
            </label>
            <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
            />
        </div>
    
        <button
            type="submit"
            className="mt-6 w-full bg-matcha hover:bg-matcha-light text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
        >
            Update Profile
        </button>
        </div>
    );
  
};

export default ProfilePage;
