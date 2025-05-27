import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-pink-50 pt-16 overflow-hidden text-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 "></div>
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-pink-300 opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-purple-300 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-10 pb-12 border-b border-pink-200">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-3">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Subscribe to receive updates, exclusive offers, and beauty tips directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white border border-pink-200 text-gray-700 px-4 py-2 rounded focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none w-full"
              />
              <button className="flex items-center justify-center bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded w-full sm:w-auto">
                Subscribe <FiArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=60&width=180&text=BEAUTY+LOGO"
                alt="Beauty Brand Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 md:text-right max-w-md">
              Elevating beauty through premium products that enhance your natural radiance. Discover the perfect blend
              of luxury and effectiveness.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-pink-200">
          {[
            { title: "Shop", links: ["New Arrivals", "Bestsellers", "Skincare", "Makeup", "Hair Care", "Body & Bath", "Fragrance", "Gift Sets"] },
            { title: "Information", links: ["About Us", "Beauty Blog", "Beauty Tips", "Ingredients", "Sustainability", "Careers", "Press"] },
            { title: "Customer Service", links: ["Contact Us", "FAQs", "Shipping & Returns", "Track Order", "My Account", "Loyalty Program", "Store Locator"] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-gray-800 mb-4 uppercase tracking-wider text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-pink-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-medium text-gray-800 mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-pink-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Beauty Boulevard, Cosmetic City, CC 10001</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600">+1 (800) BEAUTY-123</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600">support@beautyproducts.com</span>
              </li>
              <li className="pt-4">
                <h5 className="font-medium text-gray-800 mb-3">Follow Us</h5>
                <div className="flex space-x-4">
                  {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, index) => (
                    <Link href="#" key={index} className="text-gray-500 hover:text-pink-400 transition-colors">
                      <Icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Beauty Products. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy", "Cookie Policy"].map((item) => (
              <Link key={item} href="#" className="text-gray-500 hover:text-pink-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
