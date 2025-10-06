"use client";


import { FaSearch, FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { SlHandbag } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Package } from "lucide-react";
import { useLoggedUserQuery } from "@/redux/api/userApi";

const TopHeader = () => {
  const { data, isLoading } = useLoggedUserQuery(undefined);
  const user = data?.data;

  return (
    <div className="hidden md:block px-4 md:px-[3rem] bg-white shadow-sm">
      <div className="w-full py-4">
        <div className="flex justify-between items-center h-16">
          {/* Search Bar and Logo */}
          <div className="flex items-center">
            <div className="relative w-[480px] mr-[5rem]">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 py-2 border border-gray-300 rounded focus:outline-none text-gray-700"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            </div>
            <h1 className="text-center text-3xl font-bold text-gray-800 font-heading">
              Beauty Bay BD
            </h1>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-8 justify-end">
            {/* Wishlist */}
            <div className="flex space-x-2 items-center cursor-pointer hover:text-pink-600 transition-colors">
              <div className="relative">
                <FaRegHeart className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-3 bg-[#fa9aac] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Favourite</p>
            </div>

            {/* Cart */}
            <div className="flex space-x-2 items-center cursor-pointer hover:text-pink-600 transition-colors">
              <div className="relative">
                <SlHandbag className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-3 bg-[#fa9aac] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">Bag</p>
            </div>

            {/* Account / User */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer focus:outline-none">
                  <Image
                    src={user.image?.[0] || "/assets/default-avatar.png"}
                    alt={user.fname}
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.fname}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 mt-2">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-600" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="h-4 w-4 text-red-600" />
                    <button className="text-red-600 font-semibold">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer focus:outline-none">
                  <FaRegUser className="text-gray-700 text-xl" />
                  <span className="text-sm font-medium text-gray-700">
                    Login
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mt-2">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;


