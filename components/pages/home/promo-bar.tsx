import { FaGift, FaMobileAlt, FaEnvelope, FaStar } from "react-icons/fa";

const PromoBar = () => {
  const promos = [
    { icon: <FaGift className="text-[#fa9aac]" />, text: "Free UK shipping over £25" },
    { icon: <FaMobileAlt className="text-[#fa9aac]" />, text: "15% off your app order" },
    { icon: <FaEnvelope className="text-[#fa9aac]" />, text: "Sign up for email exclusives" },
    { icon: <FaStar className="text-[#fa9aac]" />, text: "Earn Cult Status Points" },
  ];

  return (
    <>
    <div className="bg-gray-100 py-3">
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
        {promos.map((promo, index) => (
          <div key={index} className="flex items-center gap-2">
            {promo.icon}
            <span>{promo.text}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#FF80AB] py-3 text-center text-white text-md font-medium ">
      £5.95 Premier Delivery - Get it in time for Mother's Day
    </div>
    </>
  );
};

export default PromoBar;
