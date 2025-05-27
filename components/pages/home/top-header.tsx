"use client";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";
import { SlHandbag } from "react-icons/sl";

const TopHeader = () => {
  return (
    <div className=" hidden md:block px-4 md:px-[3rem]">
      <div className="w-full py-4">
        <div className="flex justify-between items-center h-16">

          {/* Search Bar and Logo */}
          <div className="flex">
            <div className="relative w-[480px] mr-[5rem]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none text-gray-700"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            </div>
            <h1 className="text-center text-3xl font-bold text-gray-800 font-heading">
              Beauty bay bd
            </h1>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 justify-end">

            {/* Wishlist */}
            <div className="flex space-x-4">
              <div className="relative flex items-center cursor-pointer hover:text-pink-600 transition-colors">
                <FaRegHeart className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-3 bg-[#fa9aac] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Favourite</p>
            </div>

            {/* Account */}
            <Link href="/profile">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-600 transition-colors">
                <FaRegUser className="text-gray-700 text-xl" />
                <span className="text-sm font-medium text-gray-700">Account</span>
              </div>
            </Link>

            {/* Cart */}
            <div className="flex space-x-4">
              <div className="relative flex items-center cursor-pointer hover:text-pink-600 transition-colors">
                <SlHandbag className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-3 bg-[#fa9aac] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Bag</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
