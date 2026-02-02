import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Premium Tshirts",
    desc: "Our T-Shirts are 100% made of cotton.",
  },
  {
    title: "Premium Tshirts",
    desc: "Our T-Shirts are 100% made of cotton.",
  },
  {
    title: "Premium Tshirts",
    desc: "Our T-Shirts are 100% made of cotton.",
  },
];

const Track = () => {
  return (
    <div className="w-full py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg bg-white p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="mb-3 text-pink-600">
              <ShoppingBagIcon className="w-8 h-8" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Track;
