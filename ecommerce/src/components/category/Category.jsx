
/**
 * Category Component
 * ------------------
 * Displays product categories in a horizontal scrollable list.
 * Each category is clickable and navigates the user
 * to a category-based product listing page.
 */

import { useNavigate } from "react-router-dom";

// Category data (name + image)
const categories = [
  {
    name: "fashion",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865367/ChatGPT_Image_Jan_31_2026_06_42_06_PM_x0hsgo.png",
  },
  {
    name: "shirt",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865367/ChatGPT_Image_Jan_31_2026_06_45_06_PM_jdcczd.png",
  },
  {
    name: "jacket",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865367/ChatGPT_Image_Jan_31_2026_06_45_18_PM_vtatxb.png",
  },
  {
    name: "mobile",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865366/ChatGPT_Image_Jan_31_2026_06_45_09_PM_pv7nuv.png",
  },
  {
    name: "laptop",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865366/ChatGPT_Image_Jan_31_2026_06_45_09_PM_pv7nuv.png",
  },
  {
    name: "home",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865366/ChatGPT_Image_Jan_31_2026_06_45_09_PM_pv7nuv.png",
  },
  {
    name: "book",
    image:
      "https://res.cloudinary.com/dknz9umvs/image/upload/v1769865366/ChatGPT_Image_Jan_31_2026_06_45_09_PM_pv7nuv.png",
  },
];

const Category = () => {
  // Navigation hook
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto lg:justify-center scrollbar-hide">
        <div className="flex">
          
          {/* Loop through categories */}
          {categories.map((item, index) => (
            <div key={index} className="px-3 lg:px-10">
              
              {/* Category Image */}
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer transition-all hover:bg-pink-600 mb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 lg:w-14 lg:h-14 object-contain"
                />
              </div>

              {/* Category Name */}
              <h1 className="text-sm lg:text-lg text-center font-medium capitalize">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;












